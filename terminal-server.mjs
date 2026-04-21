/**
 * Terminal Executor Server - Port 3001
 * Menerima perintah shell dan mengembalikan output
 * Berjalan sebagai proses Node.js terpisah
 */
import { createServer } from 'http'
import { exec, spawn } from 'child_process'
import { promisify } from 'util'
import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import { createRequire } from 'module'
const _require = createRequire(import.meta.url)
const crypto2  = _require('/home/user/webapp/lpd-crypto.cjs')

// ─── Path ke private keys LPD Seminyak ───────────────────────────────────────
const LPD_DIR    = '/home/user/webapp/lpd_seminyak'
const PRIV_BPD   = LPD_DIR + '/private_bpd_003.pem'   // untuk SNAP token
const PRIV_LPD   = LPD_DIR + '/private_key_lpd.pem'   // untuk iOS token
const WHITELIST_IP = '34.50.74.78'                      // IP yang diizinkan di GIO_WHITE_LIST

// ─── Helper: ISO timestamp Jakarta (UTC+7) ────────────────────────────────────
function isoTimestampJKT() {
  const now = new Date()
  // Offset +07:00
  const offset = 7 * 60
  const local = new Date(now.getTime() + offset * 60000)
  const iso = local.toISOString().replace('Z', '')
  return iso + '+07:00'
}

// ─── Generate SNAP Token (BPD private key) ───────────────────────────────────
// Alur: X-TIMESTAMP + X-CLIENT-KEY → sign SHA256withRSA → X-SIGNATURE
// POST /api/v1.0/access-token/b2b  {"grantType":"client_credentials"}
async function generateSnapToken(baseUrl, clientKeyOverride) {
  const privKey = fs.readFileSync(PRIV_BPD, 'utf8')
  const ts       = isoTimestampJKT()
  const clientKey = clientKeyOverride || 'LPD-SEMINYAK-001'  // X-CLIENT-KEY (partner ID)
  const msg      = clientKey + '|' + ts
  const sig      = crypto.sign('SHA256', Buffer.from(msg), {
    key: privKey, padding: crypto.constants.RSA_PKCS1_PADDING
  })
  const signature = sig.toString('base64')

  // Laravel routes/api.php gets /api prefix from RouteServiceProvider
  const base = baseUrl.replace(/\/+$/, '')
  const url = base + '/api/v1.0/access-token/b2b'
  const headers = {
    'Content-Type':    'application/json',
    'X-TIMESTAMP':     ts,
    'X-CLIENT-KEY':    clientKey,
    'X-SIGNATURE':     signature,
    'X-Forwarded-For': WHITELIST_IP,
    'X-Real-IP':       WHITELIST_IP,
  }
  const body = JSON.stringify({ grantType: 'client_credentials' })

  let data, httpStatus
  try {
    const res = await fetchWithTimeout(url, { method: 'POST', headers, body }, 15000)
    httpStatus = res.status
    const rawBody = await res.text()
    try { data = JSON.parse(rawBody) } catch(_) {
      return {
        ok: false, type: 'snap',
        error: 'Server returned HTTP ' + httpStatus + ' (non-JSON response)',
        hint: 'Cek Base URL dan pastikan server berjalan.',
        httpStatus, url, timestamp: ts, clientKey,
        signaturePreview: signature.substring(0, 20) + '...',
        headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-KEY': clientKey, 'X-SIGNATURE': signature },
      }
    }
  } catch(e) {
    return { ok: false, type: 'snap', error: e.message, url,
      headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-KEY': clientKey, 'X-SIGNATURE': signature } }
  }
  return {
    ok: true, type: 'snap',
    token: data.accessToken || null,
    responseCode: data.responseCode,
    responseMessage: data.responseMessage,
    httpStatus,
    url,
    timestamp: ts,
    clientKey,
    signaturePreview: signature.substring(0, 20) + '...',
    headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-KEY': clientKey, 'X-SIGNATURE': signature },
    raw: data,
  }
}

// ─── Generate iOS Token (LPD private key) ────────────────────────────────────
// Alur: X-TIMESTAMP → sign SHA256withRSA(hash("Seminyak|<ts>")) → X-SIGNATURE
// X-CLIENT-ID = encrypted device ID (kita pakai format dummy)
// POST /smart/access/token
async function generateIosToken(baseUrl, clientIdEnc) {
  const privKey = fs.readFileSync(PRIV_LPD, 'utf8')
  const ts      = isoTimestampJKT()

  // Buat hash yang sama persis seperti di PHP:
  // $clientStamp = hash("sha256", "Seminyak|". $timeStamp)
  const clientStamp = crypto.createHash('sha256')
    .update('Seminyak|' + ts)
    .digest('hex')

  const sig = crypto.sign('SHA256', Buffer.from(clientStamp), {
    key: privKey, padding: crypto.constants.RSA_PKCS1_PADDING
  })
  const signature = sig.toString('base64')

  // Laravel routes use /api prefix
  const base = baseUrl.replace(/\/+$/, '')
  const url = base + '/api/smart/access/token'
  const headers = {
    'Content-Type':    'application/json',
    'X-TIMESTAMP':     ts,
    'X-CLIENT-ID':     clientIdEnc || '',
    'X-SIGNATURE':     signature,
    'X-Forwarded-For': WHITELIST_IP,
    'X-Real-IP':       WHITELIST_IP,
  }

  let data, httpStatus, rawBody
  try {
    const res = await fetchWithTimeout(url, { method: 'POST', headers, body: '' }, 15000)
    httpStatus = res.status
    rawBody = await res.text()
    try { data = JSON.parse(rawBody) } catch(_) {
      // Server returned non-JSON (e.g. 500 HTML error page)
      return {
        ok: false, type: 'ios',
        error: 'Server returned HTTP ' + httpStatus + ' (non-JSON response)',
        hint: httpStatus === 500
          ? 'Server error HTTP 500 – Koneksi database SQL Server production bermasalah (bukan masalah signature). Public key sudah terdaftar di server via /api/smart/access/key.'
          : 'Cek Base URL dan endpoint.',
        httpStatus, url, timestamp: ts,
        signaturePreview: signature.substring(0, 20) + '...',
        headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-ID': clientIdEnc || '', 'X-SIGNATURE': signature },
      }
    }
  } catch(e) {
    return { ok: false, type: 'ios', error: e.message, url,
      headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-ID': clientIdEnc || '', 'X-SIGNATURE': signature } }
  }
  return {
    ok: true, type: 'ios',
    token: data.token || null,
    status: data.status,
    message: data.message,
    httpStatus,
    url,
    timestamp: ts,
    signaturePreview: signature.substring(0, 20) + '...',
    headers: { 'X-TIMESTAMP': ts, 'X-CLIENT-ID': clientIdEnc || '', 'X-SIGNATURE': signature },
    raw: data,
  }
}

// ─── Fetch with timeout ───────────────────────────────────────────────────────
async function fetchWithTimeout(url, opts, ms) {
  const { default: fetch } = await import('node-fetch').catch(() => ({ default: globalThis.fetch }))
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...opts, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

const execAsync = promisify(exec)
const PORT = 3001
const TIMEOUT_MS = 15000 // 15 detik max per command

// Working directory default
let cwd = process.env.HOME || '/home/user'

// Daftar perintah yang diblokir (keamanan dasar)
const BLOCKED = [
  /rm\s+-rf\s+\//,
  /mkfs/,
  /dd\s+if=\/dev/,
  /:\(\)\{:\|:&\};:/,  // fork bomb
  /chmod\s+-R\s+777\s+\//,
]

function isBlocked(cmd) {
  return BLOCKED.some(r => r.test(cmd))
}

// CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
}

const server = createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders())
    res.end()
    return
  }

  const url = new URL(req.url, `http://localhost:${PORT}`)

  // Health check
  if (url.pathname === '/health') {
    res.writeHead(200, corsHeaders())
    res.end(JSON.stringify({ status: 'ok', cwd }))
    return
  }

  // Execute command endpoint
  if (url.pathname === '/exec' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const { command, workdir } = JSON.parse(body)
        if (!command || typeof command !== 'string') {
          res.writeHead(400, corsHeaders())
          res.end(JSON.stringify({ error: 'command required' }))
          return
        }

        // Update working dir jika dikirim
        if (workdir) cwd = workdir

        // Handle perintah "cd <path>" TUNGGAL (tanpa && | ; dll)
        // Jika ada operator shell, biarkan bash yang handle via execAsync
        const isSingleCd = /^cd(\s+\S+)?$/.test(command.trim())
        if (isSingleCd) {
          const { execSync } = await import('child_process')
          try {
            const afterCd = command.trim().slice(2).trim()
            const target = (afterCd || process.env.HOME || '/home/user')
              .replace(/^~(?=\/|$)/, process.env.HOME || '/home/user')
            const newPath = target.startsWith('/') ? target : `${cwd}/${target}`
            const resolved = execSync(`cd "${newPath.replace(/"/g, '\\"')}" && pwd`, {
              encoding: 'utf8', cwd
            }).trim()
            cwd = resolved
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({ stdout: '', stderr: '', cwd, exitCode: 0 }))
          } catch (e) {
            const target = command.trim().slice(2).trim() || '~'
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({ stdout: '', stderr: `bash: cd: ${target}: No such file or directory`, cwd, exitCode: 1 }))
          }
          return
        }

        // Cek command berbahaya
        if (isBlocked(command)) {
          res.writeHead(200, corsHeaders())
          res.end(JSON.stringify({ stdout: '', stderr: '⛔ Perintah diblokir karena alasan keamanan.', cwd, exitCode: 1 }))
          return
        }

        // Jalankan perintah — append "&&pwd" tersembunyi untuk track cwd
        // Dipisahkan dengan sentinel agar bisa di-parse
        const SENTINEL = '__CWD_SENTINEL__'
        const wrappedCmd = `(${command}) && printf '\\n${SENTINEL}' && pwd`

        const startTime = Date.now()
        try {
          const { stdout: rawOut, stderr } = await Promise.race([
            execAsync(wrappedCmd, {
              cwd,
              timeout: TIMEOUT_MS,
              maxBuffer: 1024 * 1024 * 2, // 2MB
              env: { ...process.env, TERM: 'xterm-256color', COLORTERM: 'truecolor' },
              shell: '/bin/bash',
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS)
            )
          ])

          // Ekstrak stdout asli & cwd baru
          let stdout = rawOut
          const sentinelIdx = rawOut.lastIndexOf('\n' + SENTINEL)
          if (sentinelIdx !== -1) {
            stdout = rawOut.slice(0, sentinelIdx)
            const newCwd = rawOut.slice(sentinelIdx + SENTINEL.length + 1).trim()
            if (newCwd) cwd = newCwd
          }

          const duration = Date.now() - startTime
          res.writeHead(200, corsHeaders())
          res.end(JSON.stringify({ stdout, stderr, cwd, exitCode: 0, duration }))
        } catch (err) {
          const duration = Date.now() - startTime
          if (err.message === 'TIMEOUT') {
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({ stdout: '', stderr: `⏱ Timeout: perintah melebihi ${TIMEOUT_MS/1000}s`, cwd, exitCode: 124, duration }))
          } else {
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({
              stdout: err.stdout || '',
              stderr: err.stderr || err.message,
              cwd,
              exitCode: err.code || 1,
              duration
            }))
          }
        }
      } catch (parseErr) {
        res.writeHead(400, corsHeaders())
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }
    })
    return
  }

  // ── Token generator endpoint ──────────────────────────────────────────────
  if (url.pathname === '/token-generate' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const { type, baseUrl, clientIdEnc, clientKey } = JSON.parse(body)
        let result
        if (type === 'snap') {
          result = await generateSnapToken(baseUrl || 'https://lpdseminyak.biz.id:8000', clientKey)
        } else if (type === 'ios') {
          result = await generateIosToken(baseUrl || 'https://lpdseminyak.biz.id:8000', clientIdEnc || '')
        } else {
          res.writeHead(400, corsHeaders())
          res.end(JSON.stringify({ ok: false, error: 'type must be snap or ios' }))
          return
        }
        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify(result))
      } catch (e) {
        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify({ ok: false, error: e.message, stack: e.stack?.split('\n').slice(0,3).join(' | ') }))
      }
    })
    return
  }

  // ── Crypto operations endpoint ────────────────────────────────────────────
  if (url.pathname === '/crypto' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const params = JSON.parse(body)
        const { createRequire } = await import('module')
        const require2 = createRequire(import.meta.url)
        const crypto2 = require2('/home/user/webapp/lpd-crypto.cjs')
        const op = params.op

        let result = {}

        if (op === 'keygen') {
          // Derive AES keys from clientID + timestamp
          result = crypto2.deriveAesKeys(params.clientID, params.timestamp)

        } else if (op === 'encrypt') {
          // AES encrypt
          const enc = crypto2.aesEncrypt(params.plaintext, params.aesKey, params.aesIv)
          result = { encrypted: enc, plaintext: params.plaintext }

        } else if (op === 'decrypt') {
          // AES decrypt
          const dec = crypto2.aesDecrypt(params.ciphertext, params.aesKey, params.aesIv)
          result = { decrypted: dec, ciphertext: params.ciphertext }

        } else if (op === 'did-decode') {
          // Decode X-CLIENT-ID
          result = crypto2.decodeDID(params.did)

        } else if (op === 'did-encode') {
          // Encode X-CLIENT-ID
          const enc = crypto2.encodeDID(params.clientID, params.timestamp, params.appName || 'Seminyak')
          result = { encoded: enc, clientID: params.clientID, timestamp: params.timestamp }

        } else if (op === 'jwt-decode') {
          // Decode JWT Authorization
          result = crypto2.decodeJWT(params.jwt)

        } else if (op === 'hashcode') {
          // Generate hash_code
          const step = params.step || 'check'
          let hash
          if (step === 'posting') {
            hash = crypto2.generateHashCodePosting(params)
          } else if (step === 'lpd') {
            hash = crypto2.generateHashCodeLPD(params)
          } else {
            hash = crypto2.generateHashCodeCheck(params)
          }
          result = { hash, step, formula: step === 'posting'
            ? `SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")"+"${crypto2.BPD_HASHCODE}+"@")`
            : `SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|"+"${crypto2.BPD_HASHCODE}+"%")` }

        } else if (op === 'reference') {
          // Generate X-REFERENCE
          const refs = []
          for (let i = 0; i < (params.count || 3); i++) {
            refs.push(crypto2.generateReference(params.prefix || 'SMY'))
          }
          result = { references: refs }

        } else if (op === 'signature') {
          // Generate X-SIGNATURE / X-PARTNER-ID
          const sig = crypto2.generateSignature(params.token, params.timestamp, params.aesCs)
          result = { signature: sig }

        } else if (op === 'sig-decode') {
          // Decode X-SIGNATURE base64 → hex
          const hex = crypto2.decodeSignature(params.signature)
          result = { hex, length: hex.length }

        } else if (op === 'ios-token-sig') {
          // iOS token signature
          result = crypto2.generateIosTokenSig(params.timestamp || crypto2.nowJakarta())

        } else if (op === 'snap-token-sig') {
          // SNAP token signature
          result = crypto2.generateSnapTokenSig(
            params.clientKey || 'LPD-SEMINYAK-001',
            params.timestamp || crypto2.nowJakartaISO()
          )

        } else if (op === 'build-transfer') {
          // Build complete transfer request
          result = crypto2.buildBankTransferRequest({
            ...params,
            timestamp: params.timestamp || crypto2.nowJakarta(),
            refNo: params.refNo || crypto2.generateReference()
          })

        } else if (op === 'decrypt-body') {
          // Decrypt full request body
          result = { decrypted: crypto2.decryptRequestBody(params.body, params.aesKey, params.aesIv) }

        } else if (op === 'timestamp') {
          // Get current timestamps
          result = {
            jakarta: crypto2.nowJakarta(),
            jakartaISO: crypto2.nowJakartaISO(),
            utc: new Date().toISOString()
          }

        } else {
          res.writeHead(400, corsHeaders())
          res.end(JSON.stringify({ ok: false, error: `Unknown operation: ${op}` }))
          return
        }

        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify({ ok: true, op, result }))
      } catch (e) {
        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify({ ok: false, error: e.message, stack: e.stack?.split('\n').slice(0,3).join(' | ') }))
      }
    })
    return
  }

  // ── /smart  — Login & Transaksi ───────────────────────────────────────────
  if (url.pathname === '/smart' && req.method === 'POST') {
    let body = ''
    req.on('data', d => { body += d })
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body)
        const result = await handleSmart(parsed)
        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify(result))
      } catch (e) {
        res.writeHead(200, corsHeaders())
        res.end(JSON.stringify({ ok: false, error: e.message, stack: e.stack?.split('\n').slice(0,3).join(' | ') }))
      }
    })
    return
  }

  res.writeHead(404, corsHeaders())
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Terminal executor server running on port ${PORT}`)
  console.log(`Working directory: ${cwd}`)
})

server.on('error', (err) => {
  console.error('Server error:', err)
  process.exit(1)
})

// ═══════════════════════════════════════════════════════════════════════════
// /smart  — Login & Transaksi LPD Seminyak
// Semua request butuh: token (JWT), aesKey, aesIv, aesCs, clientIdEnc, baseUrl
// ═══════════════════════════════════════════════════════════════════════════

// Helper: buat header standar untuk setiap request smart
function buildSmartHeaders(token, aesCs, clientIdEnc, transNo) {
  const ts    = crypto2.nowJakarta()
  const tsISO = crypto2.nowJakartaISO()

  // Authorization JWT
  const privLpd = fs.readFileSync(PRIV_LPD, 'utf8')
  const jwt     = crypto2.createJWT(transNo || crypto2.generateReference(), tsISO, privLpd)

  // X-SIGNATURE & X-PARTNER-ID = HMAC-SHA512(jwt:ts, aesCs)
  const sig       = crypto2.generateSignature(jwt, ts, aesCs)
  const partnerId = sig   // same value

  // X-REFERENCE
  const xref = crypto2.generateReference()

  return {
    jwt, ts, tsISO, sig, partnerId, xref,
    headers: {
      'Content-Type':    'application/json',
      'Authorization':   jwt,
      'X-TIMESTAMP':     ts,
      'X-SIGNATURE':     sig,
      'X-PARTNER-ID':    partnerId,
      'X-CLIENT-ID':     clientIdEnc,
      'X-REFERENCE':     xref,
      'X-Forwarded-For': WHITELIST_IP,
      'X-Real-IP':       WHITELIST_IP,
    }
  }
}

// Handler utama /smart
async function handleSmart(body) {
  const { action, baseUrl: rawBase, token, aesKey, aesIv, aesCs,
          clientIdEnc, transNo, ...params } = body

  const base = (rawBase || 'https://lpdseminyak.biz.id:8000').replace(/\/+$/, '')

  // ── LOGIN ───────────────────────────────────────────────────────────────────
  if (action === 'login') {
    const { user_name, user_pass } = params
    if (!user_name || !user_pass) throw new Error('user_name dan user_pass wajib diisi')
    if (!aesKey || !aesIv)        throw new Error('aesKey dan aesIv wajib diisi')

    // Enkripsi kredensial
    const encUser = crypto2.aesEncrypt(user_name, aesKey, aesIv)
    const encPass = crypto2.aesEncrypt(user_pass, aesKey, aesIv)

    const { headers, ts, jwt, sig, partnerId, xref } = buildSmartHeaders(token, aesCs, clientIdEnc, transNo)
    const url  = base + '/api/smart/access/login'
    const data = JSON.stringify({ user_name: encUser, user_pass: encPass })

    let httpStatus, raw, parsed
    try {
      const r = await fetchWithTimeout(url, { method: 'POST', headers, body: data }, 15000)
      httpStatus = r.status
      raw        = await r.text()
      try { parsed = JSON.parse(raw) } catch(_) { parsed = { _raw: raw } }
    } catch(e) {
      return { ok: false, action, error: e.message, url, headers }
    }

    return {
      ok: httpStatus >= 200 && httpStatus < 300,
      action, httpStatus, url,
      result: parsed,
      debug: {
        ts, xref,
        user_name_enc: encUser,
        user_pass_enc: encPass,
        jwt_preview:   jwt.substring(0, 40) + '...',
        sig_preview:   sig.substring(0, 20) + '...',
        partnerId_preview: partnerId.substring(0, 20) + '...',
      },
      requestHeaders: headers,
      requestBody: { user_name: encUser, user_pass: encPass },
    }
  }

  // ── CEK SALDO ────────────────────────────────────────────────────────────────
  if (action === 'cek-saldo') {
    const { no_rek } = params
    if (!no_rek)  throw new Error('no_rek wajib diisi')
    if (!token)   throw new Error('token (JWT dari login) wajib diisi')
    if (!aesKey || !aesIv) throw new Error('aesKey dan aesIv wajib diisi')

    const encNoRek = crypto2.aesEncrypt(no_rek, aesKey, aesIv)

    const { headers, ts, xref } = buildSmartHeaders(token, aesCs, clientIdEnc, transNo)
    const url  = base + '/api/smart/account/balance'
    const data = JSON.stringify({ no_rek: encNoRek })

    let httpStatus, raw, parsed
    try {
      const r = await fetchWithTimeout(url, { method: 'POST', headers, body: data }, 15000)
      httpStatus = r.status
      raw        = await r.text()
      try { parsed = JSON.parse(raw) } catch(_) { parsed = { _raw: raw } }
    } catch(e) {
      return { ok: false, action, error: e.message, url, headers }
    }

    return {
      ok: httpStatus >= 200 && httpStatus < 300,
      action, httpStatus, url,
      result: parsed,
      debug: { ts, xref, no_rek_enc: encNoRek },
      requestHeaders: headers,
      requestBody: { no_rek: encNoRek },
    }
  }

  // ── INQUIRY TRANSFER ─────────────────────────────────────────────────────────
  if (action === 'inquiry') {
    const { no_rek_from, no_rek_to, nominal, bank_dest } = params
    if (!no_rek_from || !no_rek_to || !nominal) throw new Error('no_rek_from, no_rek_to, nominal wajib diisi')
    if (!token)   throw new Error('token wajib diisi')
    if (!aesKey || !aesIv || !aesCs) throw new Error('aesKey, aesIv, aesCs wajib diisi')

    const ref = transNo || crypto2.generateReference()
    const { headers, ts, xref } = buildSmartHeaders(token, aesCs, clientIdEnc, ref)

    const encFrom   = crypto2.aesEncrypt(no_rek_from, aesKey, aesIv)
    const encTo     = crypto2.aesEncrypt(no_rek_to, aesKey, aesIv)
    const encNom    = crypto2.aesEncrypt(nominal, aesKey, aesIv)
    const encBank   = bank_dest ? crypto2.aesEncrypt(bank_dest, aesKey, aesIv) : ''

    const url  = base + '/api/smart/transfer/inquiry'
    const reqBody = { no_rek_from: encFrom, no_rek_to: encTo, nominal: encNom, bank_dest: encBank, ref_no: ref }
    const data = JSON.stringify(reqBody)

    let httpStatus, raw, parsed
    try {
      const r = await fetchWithTimeout(url, { method: 'POST', headers, body: data }, 15000)
      httpStatus = r.status
      raw        = await r.text()
      try { parsed = JSON.parse(raw) } catch(_) { parsed = { _raw: raw } }
    } catch(e) {
      return { ok: false, action, error: e.message, url, headers }
    }

    return {
      ok: httpStatus >= 200 && httpStatus < 300,
      action, httpStatus, url,
      result: parsed,
      debug: { ts, xref, ref, no_rek_from_enc: encFrom, no_rek_to_enc: encTo, nominal_enc: encNom },
      requestHeaders: headers,
      requestBody: reqBody,
    }
  }

  // ── POSTING TRANSFER ─────────────────────────────────────────────────────────
  if (action === 'posting') {
    const { no_rek_from, no_rek_to, nominal, bank_dest, nama_dest, keterangan } = params
    if (!no_rek_from || !no_rek_to || !nominal) throw new Error('no_rek_from, no_rek_to, nominal wajib diisi')
    if (!token)   throw new Error('token wajib diisi')
    if (!aesKey || !aesIv || !aesCs) throw new Error('aesKey, aesIv, aesCs wajib diisi')

    const ref = transNo || crypto2.generateReference()
    const { headers, ts, xref } = buildSmartHeaders(token, aesCs, clientIdEnc, ref)

    const encFrom   = crypto2.aesEncrypt(no_rek_from, aesKey, aesIv)
    const encTo     = crypto2.aesEncrypt(no_rek_to, aesKey, aesIv)
    const encNom    = crypto2.aesEncrypt(nominal, aesKey, aesIv)
    const encBank   = bank_dest  ? crypto2.aesEncrypt(bank_dest, aesKey, aesIv)  : ''
    const encNama   = nama_dest  ? crypto2.aesEncrypt(nama_dest, aesKey, aesIv)  : ''
    const encKet    = keterangan ? crypto2.aesEncrypt(keterangan, aesKey, aesIv) : ''

    const url  = base + '/api/smart/transfer/posting'
    const reqBody = {
      no_rek_from: encFrom, no_rek_to: encTo, nominal: encNom,
      bank_dest: encBank, nama_dest: encNama, keterangan: encKet, ref_no: ref,
    }
    const data = JSON.stringify(reqBody)

    let httpStatus, raw, parsed
    try {
      const r = await fetchWithTimeout(url, { method: 'POST', headers, body: data }, 15000)
      httpStatus = r.status
      raw        = await r.text()
      try { parsed = JSON.parse(raw) } catch(_) { parsed = { _raw: raw } }
    } catch(e) {
      return { ok: false, action, error: e.message, url, headers }
    }

    return {
      ok: httpStatus >= 200 && httpStatus < 300,
      action, httpStatus, url,
      result: parsed,
      debug: { ts, xref, ref },
      requestHeaders: headers,
      requestBody: reqBody,
    }
  }

  throw new Error('action tidak dikenal: ' + action + '. Gunakan: login, cek-saldo, inquiry, posting')
}
