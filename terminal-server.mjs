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
// POST /v1.0/access-token/b2b  {"grantType":"client_credentials"}
async function generateSnapToken(baseUrl) {
  const privKey = fs.readFileSync(PRIV_BPD, 'utf8')
  const ts       = isoTimestampJKT()
  const clientKey = 'LPD-SEMINYAK-001'  // X-CLIENT-KEY (partner ID)
  const msg      = clientKey + '|' + ts
  const sig      = crypto.sign('SHA256', Buffer.from(msg), {
    key: privKey, padding: crypto.constants.RSA_PKCS1_PADDING
  })
  const signature = sig.toString('base64')

  const url = baseUrl.replace(/\/+$/, '') + '/v1.0/access-token/b2b'
  const headers = {
    'Content-Type':    'application/json',
    'X-TIMESTAMP':     ts,
    'X-CLIENT-KEY':    clientKey,
    'X-SIGNATURE':     signature,
    'X-Forwarded-For': WHITELIST_IP,
  }
  const body = JSON.stringify({ grantType: 'client_credentials' })

  const res  = await fetchWithTimeout(url, { method: 'POST', headers, body }, 15000)
  const data = await res.json()
  return {
    ok: true, type: 'snap',
    token: data.accessToken || null,
    responseCode: data.responseCode,
    responseMessage: data.responseMessage,
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

  const url = baseUrl.replace(/\/+$/, '') + '/smart/access/token'
  const headers = {
    'Content-Type':    'application/json',
    'X-TIMESTAMP':     ts,
    'X-CLIENT-ID':     clientIdEnc || '',
    'X-SIGNATURE':     signature,
    'X-Forwarded-For': WHITELIST_IP,
  }

  const res  = await fetchWithTimeout(url, { method: 'POST', headers, body: '' }, 15000)
  const data = await res.json()
  return {
    ok: true, type: 'ios',
    token: data.token || null,
    status: data.status,
    message: data.message,
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
        const { type, baseUrl, clientIdEnc } = JSON.parse(body)
        let result
        if (type === 'snap') {
          result = await generateSnapToken(baseUrl || 'https://lpdseminyak.biz.id:8000')
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
