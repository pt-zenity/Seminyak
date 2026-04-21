/**
 * Terminal Executor Server - Port 3001
 * Menerima perintah shell dan mengembalikan output
 * Berjalan sebagai proses Node.js terpisah
 */
import { createServer } from 'http'
import { exec, spawn } from 'child_process'
import { promisify } from 'util'
import os from 'os'

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

        // Handle perintah cd khusus
        const cdMatch = command.trim().match(/^cd\s+(.+)$/)
        if (cdMatch) {
          const { execSync } = await import('child_process')
          try {
            const target = cdMatch[1].replace(/^~/, process.env.HOME || '/home/user')
            // Resolusi path relatif
            const newPath = target.startsWith('/') ? target : `${cwd}/${target}`
            const resolved = execSync(`cd "${newPath}" && pwd`, { encoding: 'utf8' }).trim()
            cwd = resolved
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({ stdout: '', stderr: '', cwd, exitCode: 0 }))
          } catch (e) {
            res.writeHead(200, corsHeaders())
            res.end(JSON.stringify({ stdout: '', stderr: `bash: cd: ${cdMatch[1]}: No such file or directory`, cwd, exitCode: 1 }))
          }
          return
        }

        // Cek command berbahaya
        if (isBlocked(command)) {
          res.writeHead(200, corsHeaders())
          res.end(JSON.stringify({ stdout: '', stderr: '⛔ Perintah diblokir karena alasan keamanan.', cwd, exitCode: 1 }))
          return
        }

        // Jalankan perintah
        const startTime = Date.now()
        try {
          const { stdout, stderr } = await Promise.race([
            execAsync(command, {
              cwd,
              timeout: TIMEOUT_MS,
              maxBuffer: 1024 * 1024 * 2, // 2MB
              env: { ...process.env, TERM: 'xterm-256color', COLORTERM: 'truecolor' },
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS)
            )
          ])
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
