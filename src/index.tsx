import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { getSwaggerHTML } from './swagger'
import { getCryptoHTML } from './crypto'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))
app.get('/favicon.ico', (c) => c.body(null, 204))

// ── Terminal proxy ──────────────────────────────────────────────────────────
// Forward perintah ke terminal-server (Node.js) di port 3001
// Cloudflare Workers tidak bisa exec langsung, jadi pakai fetch proxy
app.post('/api/exec', async (c) => {
  try {
    const body = await c.req.json()
    const resp = await fetch('http://127.0.0.1:3001/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await resp.json() as Record<string, unknown>
    return c.json(data)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return c.json({ stdout: '', stderr: 'Terminal server tidak tersedia: ' + msg, cwd: '/home/user', exitCode: 1 }, 500)
  }
})

app.get('/api/exec/health', async (c) => {
  try {
    const resp = await fetch('http://127.0.0.1:3001/health')
    const data = await resp.json() as Record<string, unknown>
    return c.json({ ok: true, ...data })
  } catch {
    // On Cloudflare Pages edge: terminal-server not available
    return c.json({ ok: false, error: 'Terminal server tidak tersedia di production. Gunakan sandbox URL untuk operasi crypto.', sandbox_only: true })
  }
})
// ── Crypto operations proxy ──────────────────────────────────────────────────
// Forward crypto operations ke terminal-server (Node.js yang punya akses fs/crypto)
app.post('/api/crypto', async (c) => {
  try {
    const body = await c.req.json()
    const resp = await fetch('http://127.0.0.1:3001/crypto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await resp.json() as Record<string, unknown>
    return c.json(data)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return c.json({ ok: false, error: 'Crypto server error: ' + msg + '. Pastikan menggunakan sandbox URL untuk operasi crypto.', sandbox_only: true })
  }
})

// ── Token Generator proxy ────────────────────────────────────────────────────
// Generate SNAP / iOS token dengan RSA signature, forward ke terminal-server
// Forward smart actions (login, cek-saldo, inquiry, posting) ke terminal-server
app.post('/api/smart', async (c) => {
  try {
    const body = await c.req.json() as Record<string, unknown>
    const resp = await fetch('http://127.0.0.1:3001/smart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await resp.json() as Record<string, unknown>
    return c.json(data)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return c.json({ ok: false, error: 'Smart server error: ' + msg + '. Pastikan menggunakan sandbox URL untuk operasi crypto.', sandbox_only: true })
  }
})

app.post('/api/token/generate', async (c) => {
  try {
    const body = await c.req.json() as Record<string, string>
    const resp = await fetch('http://127.0.0.1:3001/token-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await resp.json() as Record<string, unknown>
    return c.json(data)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return c.json({ ok: false, error: 'Token server error: ' + msg }, 500)
  }
})
// ────────────────────────────────────────────────────────────────────────────

app.get('/', (c) => {
  return c.redirect('/swagger')
})

app.get('/swagger', (c) => {
  return c.html(getSwaggerHTML())
})

app.get('/crypto', (c) => {
  return c.html(getCryptoHTML())
})

app.get('/docs', (c) => {
  const html = getDocHTML()
  return c.html(html)
})

function getDocHTML(): string {
  const codeSnippets = {
    installPhp: [
      '# Ubuntu/Debian:',
      'sudo apt-get install -y software-properties-common',
      'sudo add-apt-repository ppa:ondrej/php',
      'sudo apt-get update',
      'sudo apt-get install -y php7.4 php7.4-cli php7.4-mbstring php7.4-xml \\',
      '  php7.4-curl php7.4-zip php7.4-json php7.4-pdo php7.4-intl',
      '',
      '# Verifikasi:',
      'php7.4 --version'
    ].join('\n'),

    installOdbc: [
      '# Install ODBC Driver 17 (Ubuntu):',
      'curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -',
      'curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list \\',
      '  > /etc/apt/sources.list.d/mssql-release.list',
      'sudo apt-get update',
      'sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev',
      '',
      '# Install ekstensi PHP sqlsrv:',
      'sudo pecl install sqlsrv pdo_sqlsrv',
      'echo "extension=sqlsrv.so" >> /etc/php/7.4/cli/php.ini',
      'echo "extension=pdo_sqlsrv.so" >> /etc/php/7.4/cli/php.ini'
    ].join('\n'),

    extractCode: [
      '# Extract dari zip:',
      'unzip lpd_seminyak.zip -d /var/www/html/',
      '',
      '# Atau clone dari repository (jika ada):',
      'git clone https://your-repo.git /var/www/html/lpd_seminyak',
      '',
      '# Masuk ke direktori:',
      'cd /var/www/html/lpd_seminyak'
    ].join('\n'),

    composerInstall: [
      '# Install composer (jika belum ada):',
      'curl -sS https://getcomposer.org/installer | php7.4',
      'mv composer.phar /usr/local/bin/composer',
      '',
      '# Install dependencies:',
      'cd /var/www/html/lpd_seminyak',
      'COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev \\',
      '  --no-interaction --ignore-platform-reqs',
      '',
      '# Jika ada error autoload, jalankan:',
      'composer dump-autoload --no-scripts --optimize'
    ].join('\n'),

    envSetup: [
      'cp .env.example .env',
      '',
      '# Generate application key:',
      'php7.4 artisan key:generate',
      '',
      '# Edit file .env:',
      'nano .env'
    ].join('\n'),

    envMinimal: [
      'APP_URL=https://your-domain.com',
      'DB_HOST=your-sqlserver-host',
      'DB_DATABASE=Giosoft_LPD',
      'DB_USERNAME=sa',
      'DB_PASSWORD=your-password',
      '',
      '# Path key absolut sesuai OS:',
      'PUBLIC_KEY_LPD=/var/www/html/lpd_seminyak/keys/public_key.pem',
      'PUBLIC_KEY_BPD=/var/www/html/lpd_seminyak/public_key_bpd.pem',
      'MASTER_BANK_LIST=/var/www/html/lpd_seminyak/bank.list',
      'MASTER_PPOB_LIST=/var/www/html/lpd_seminyak/ppob.list',
      'MASTER_DISPLAY_LIST=/var/www/html/lpd_seminyak/display.list'
    ].join('\n'),

    keysSetup: [
      'mkdir -p /var/www/html/lpd_seminyak/keys',
      'cp public_key_lpd.pem keys/public_key.pem',
      'chmod 644 keys/public_key.pem'
    ].join('\n'),

    permissions: [
      'chmod -R 775 /var/www/html/lpd_seminyak/storage',
      'chmod -R 775 /var/www/html/lpd_seminyak/bootstrap/cache',
      'chown -R www-data:www-data /var/www/html/lpd_seminyak/storage'
    ].join('\n'),

    dbSchema: [
      '-- Di SQL Server Management Studio:',
      'CREATE DATABASE Giosoft_LPD;',
      'USE Giosoft_LPD;',
      '',
      '-- Tabel utama yang diperlukan:',
      '-- gmob_nasabah, gmob_token, gmob_request, gmob_transfer,',
      '-- gmob_transferlog, gmob_payment, gmob_log, gmob_access,',
      '-- gmob_rekening, gmob_responcode, gmob_counter, gmob_listaccount,',
      '-- gtb_nasabah, gtb_folio, gak_mutasi, gak_ledger,',
      '-- gum_config, gak_bookstatus, gcore_bankcode, gcore_transfer,',
      '-- gcore_log, gppob_produk, gppob_inquiry, gppob_transaction'
    ].join('\n'),

    apacheConf: [
      '# /etc/apache2/sites-available/lpd_seminyak.conf',
      '<VirtualHost *:80>',
      '    ServerName your-domain.com',
      '    DocumentRoot /var/www/html/lpd_seminyak/public',
      '    ',
      '    <Directory /var/www/html/lpd_seminyak/public>',
      '        AllowOverride All',
      '        Require all granted',
      '    </Directory>',
      '    ',
      '    ErrorLog ${APACHE_LOG_DIR}/lpd_error.log',
      '    CustomLog ${APACHE_LOG_DIR}/lpd_access.log combined',
      '</VirtualHost>',
      '',
      '# Aktifkan:',
      'a2ensite lpd_seminyak.conf',
      'a2enmod rewrite',
      'systemctl restart apache2'
    ].join('\n'),

    verify: [
      '# Cek bootstrap Laravel:',
      'php7.4 artisan env',
      '',
      '# Test koneksi database:',
      'php7.4 artisan tinker',
      '# Di dalam tinker:',
      'DB::connection()->getPdo()',
      '',
      '# Test akses API:',
      'curl -X POST https://your-domain.com/v1.0/access-token/b2b \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{\"grantType\":\"client_credentials\"}'"
    ].join('\n'),
  }

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Dokumentasi LPD Seminyak API</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#1e40af;--primary-light:#3b82f6;--secondary:#0f172a;--sidebar-w:280px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#1e293b}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:var(--secondary);color:#e2e8f0;overflow-y:auto;z-index:100;transition:transform .3s}
#sidebar .logo{padding:20px 16px 16px;border-bottom:1px solid #334155;background:linear-gradient(135deg,#1e3a8a,#1d4ed8)}
#sidebar .logo h1{font-size:18px;font-weight:700;color:#fff}
#sidebar .logo p{font-size:11px;color:#93c5fd;margin-top:2px}
#sidebar nav a{display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#94a3b8;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(255,255,255,.07);border-left-color:var(--primary-light)}
#sidebar nav a i{width:18px;text-align:center;font-size:14px}
#sidebar .nav-section{padding:12px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#475569}
#main{margin-left:var(--sidebar-w);min-height:100vh}
.topbar{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.topbar h2{font-size:20px;font-weight:700;color:var(--secondary)}
.badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600}
.badge-blue{background:#dbeafe;color:#1d4ed8}.badge-green{background:#d1fae5;color:#065f46}
.badge-yellow{background:#fef3c7;color:#92400e}.badge-red{background:#fee2e2;color:#991b1b}
.badge-purple{background:#ede9fe;color:#5b21b6}
.content{padding:32px}
.section{display:none}.section.active{display:block}
.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:24px;overflow:hidden}
.card-header{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px}
.card-header h3{font-size:15px;font-weight:700;color:var(--secondary)}
.card-body{padding:20px}
.endpoint{border:1px solid #e2e8f0;border-radius:10px;margin-bottom:16px;overflow:hidden}
.endpoint-header{padding:12px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;background:#f8fafc;transition:background .15s}
.endpoint-header:hover{background:#f1f5f9}
.method{font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;min-width:48px;text-align:center}
.method-post{background:#fef3c7;color:#92400e}.method-get{background:#d1fae5;color:#065f46}
.endpoint-path{font-family:monospace;font-size:13px;font-weight:600;color:#1e40af}
.endpoint-body{padding:16px;border-top:1px solid #f1f5f9;background:#fff}
.endpoint-body.hidden{display:none}
pre{background:#0f172a;color:#e2e8f0;padding:16px;border-radius:8px;font-size:12px;line-height:1.6;overflow-x:auto;margin:8px 0;white-space:pre-wrap;word-break:break-all}
code{font-family:'Courier New',monospace}
.inline-code{background:#f1f5f9;color:#0f172a;padding:1px 6px;border-radius:4px;font-family:monospace;font-size:12px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#f8fafc;padding:10px 14px;text-align:left;font-weight:600;color:#374151;border-bottom:2px solid #e5e7eb}
td{padding:10px 14px;border-bottom:1px solid #f3f4f6;vertical-align:top}
tr:last-child td{border-bottom:none}
.info-box{padding:12px 16px;border-radius:8px;font-size:13px;margin:12px 0;display:flex;gap:10px;align-items:flex-start}
.info-box i{margin-top:1px;flex-shrink:0}
.info-blue{background:#eff6ff;border-left:4px solid #3b82f6;color:#1e40af}
.info-yellow{background:#fffbeb;border-left:4px solid #f59e0b;color:#92400e}
.info-red{background:#fef2f2;border-left:4px solid #ef4444;color:#991b1b}
.steps{}
.step{display:flex;gap:16px;margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:10px}
.step-num{width:32px;height:32px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.step-content h4{font-weight:700;margin-bottom:6px;font-size:14px}
.step-content p{font-size:13px;color:#4b5563;line-height:1.6}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:24px}
.stat-card{background:#fff;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
.stat-card .stat-num{font-size:32px;font-weight:800}
.stat-card .stat-label{font-size:12px;color:#64748b;margin-top:4px}
.flow{display:flex;align-items:center;gap:0;flex-wrap:wrap;margin:12px 0}
.flow-step{background:#dbeafe;color:#1e40af;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600}
.flow-arrow{padding:0 8px;color:#94a3b8;font-size:18px}
.db-table{background:#1e293b;color:#e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:16px}
.db-table-header{background:#0f172a;padding:10px 16px;font-weight:700;font-family:monospace;color:#38bdf8;font-size:14px}
.db-table-body{padding:12px 16px}
.db-col{display:flex;gap:12px;padding:4px 0;font-size:12px;font-family:monospace;border-bottom:1px solid #334155}
.db-col:last-child{border-bottom:none}
.db-col-name{color:#fbbf24;min-width:160px}
.db-col-type{color:#34d399;min-width:100px}
.db-col-desc{color:#94a3b8}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:900px){.grid-2{grid-template-columns:1fr}}
@media(max-width:768px){#sidebar{transform:translateX(-100%)}#sidebar.open{transform:translateX(0)}#main{margin-left:0}}
.toggle-btn{display:none;position:fixed;bottom:20px;left:20px;z-index:200;background:var(--primary);color:#fff;border:none;border-radius:50%;width:48px;height:48px;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3)}
@media(max-width:768px){.toggle-btn{display:flex;align-items:center;justify-content:center}}
</style>
</head>
<body>

<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
  <p>API Gateway Documentation v1.0</p>
</div>
<nav>
  <div class="nav-section">Overview</div>
  <a href="#" onclick="showSection('overview');return false" class="active" id="nav-overview"><i class="fas fa-home"></i> Beranda &amp; Ringkasan</a>
  <a href="#" onclick="showSection('architecture');return false" id="nav-architecture"><i class="fas fa-sitemap"></i> Arsitektur Sistem</a>
  <a href="#" onclick="showSection('install');return false" id="nav-install"><i class="fas fa-download"></i> Panduan Instalasi</a>
  <a href="#" onclick="showSection('config');return false" id="nav-config"><i class="fas fa-cog"></i> Konfigurasi .env</a>
  <div class="nav-section">API Reference</div>
  <a href="#" onclick="showSection('auth');return false" id="nav-auth"><i class="fas fa-key"></i> Autentikasi &amp; Token</a>
  <a href="#" onclick="showSection('ios-access');return false" id="nav-ios-access"><i class="fas fa-mobile-alt"></i> iOS – Login &amp; Register</a>
  <a href="#" onclick="showSection('ios-tabungan');return false" id="nav-ios-tabungan"><i class="fas fa-piggy-bank"></i> iOS – Tabungan</a>
  <a href="#" onclick="showSection('ios-transfer-lpd');return false" id="nav-ios-transfer-lpd"><i class="fas fa-exchange-alt"></i> iOS – Transfer LPD</a>
  <a href="#" onclick="showSection('ios-transfer-bank');return false" id="nav-ios-transfer-bank"><i class="fas fa-landmark"></i> iOS – Transfer Antar Bank</a>
  <a href="#" onclick="showSection('ios-ppob');return false" id="nav-ios-ppob"><i class="fas fa-bolt"></i> iOS – PPOB</a>
  <a href="#" onclick="showSection('snap');return false" id="nav-snap"><i class="fas fa-plug"></i> SNAP – Transfer VA BPD</a>
  <a href="#" onclick="showSection('atm');return false" id="nav-atm"><i class="fas fa-credit-card"></i> ATM Cardless</a>
  <a href="#" onclick="showSection('ppob-callback');return false" id="nav-ppob-callback"><i class="fas fa-reply"></i> PPOB Callback</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showSection('database');return false" id="nav-database"><i class="fas fa-database"></i> Skema Database</a>
  <a href="#" onclick="showSection('response-codes');return false" id="nav-response-codes"><i class="fas fa-list-ol"></i> Kode Respons</a>
  <a href="#" onclick="showSection('security');return false" id="nav-security"><i class="fas fa-shield-alt"></i> Keamanan &amp; Enkripsi</a>
  <a href="#" onclick="showSection('middleware');return false" id="nav-middleware"><i class="fas fa-filter"></i> Middleware &amp; Guard</a>
  <a href="#" onclick="showSection('helpers');return false" id="nav-helpers"><i class="fas fa-tools"></i> Helper Classes</a>
  <a href="#" onclick="showSection('troubleshoot');return false" id="nav-troubleshoot"><i class="fas fa-bug"></i> Troubleshooting</a>
  <div class="nav-section">Tools</div>
  <a href="/swagger" style="color:#7c3aed;font-weight:700"><i class="fas fa-flask"></i> API Explorer (Swagger)</a>
  <a href="#" onclick="showSection('terminal');return false" id="nav-terminal"><i class="fas fa-terminal"></i> Terminal Interaktif</a>
</nav>
</aside>

<main id="main">
<div class="topbar">
  <h2 id="page-title"><i class="fas fa-home mr-2" style="color:#2563eb"></i>LPD Seminyak – Dokumentasi API</h2>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <span class="badge badge-green">Laravel 5.5</span>
    <span class="badge badge-blue">PHP 7.x</span>
    <span class="badge badge-yellow">SQL Server</span>
    <span class="badge badge-purple">JWT Auth</span>
  </div>
</div>
<div class="content">

<!-- OVERVIEW -->
<section id="section-overview" class="section active">
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-num" style="color:#1d4ed8">30+</div><div class="stat-label">Endpoint API</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#059669">7</div><div class="stat-label">Helper Classes</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#d97706">4</div><div class="stat-label">Grup Layanan</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#7c3aed">11</div><div class="stat-label">Middleware</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#dc2626">25+</div><div class="stat-label">Tabel Database</div></div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-info-circle" style="color:#3b82f6"></i><h3>Tentang Sistem LPD Seminyak</h3></div>
    <div class="card-body">
      <p style="font-size:14px;line-height:1.8;color:#374151;margin-bottom:16px">
        <strong>LPD Seminyak</strong> adalah backend API berbasis <strong>Laravel 5.5</strong> yang melayani transaksi perbankan digital untuk
        <strong>Lembaga Perkreditan Desa (LPD) Seminyak</strong>, Bali. Sistem ini bertindak sebagai gateway antara aplikasi mobile nasabah (iOS mBanking),
        mesin ATM cardless, dan sistem perbankan BPD Bali (via protokol SNAP BI).
      </p>
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Fungsi Utama:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Mobile Banking iOS (registrasi, login, tabungan)</li>
            <li>Transfer antar nasabah LPD</li>
            <li>Transfer ke bank lain (via BPD)</li>
            <li>Pembayaran PPOB (PLN, PDAM, BPJS, Pulsa)</li>
            <li>Transfer-In via Virtual Account (SNAP BI)</li>
            <li>Layanan ATM Cardless (setor/tarik tanpa kartu)</li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Teknologi Stack:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Framework: Laravel 5.5.* (PHP &gt;= 7.0)</li>
            <li>Database: Microsoft SQL Server (sqlsrv)</li>
            <li>Autentikasi: JWT (tymon/jwt-auth)</li>
            <li>HTTP Client: GuzzleHTTP ~6.0</li>
            <li>Enkripsi: AES-256-CBC + RSA (OpenSSL)</li>
            <li>Signing: HMAC-SHA512 / SHA-256</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-network-wired" style="color:#10b981"></i><h3>Topologi Integrasi</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Sistem Eksternal</th><th>Protokol</th><th>Tujuan</th></tr>
        <tr><td><strong>BPD Bali iBank</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Transfer antar bank (Inquiry + Posting)</td></tr>
        <tr><td><strong>BPD SNAP BI</strong></td><td><span class="inline-code">SNAP ISO-8583</span></td><td>Terima transfer masuk via Virtual Account</td></tr>
        <tr><td><strong>FastPay / RajaBiller</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Pembayaran PPOB (tagihan, pulsa)</td></tr>
        <tr><td><strong>IAK Prepaid/Postpaid</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Isi ulang pulsa, cek tagihan</td></tr>
        <tr><td><strong>Lamanuna (SmartIndo)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Get Token, Insert IP, Insert User</td></tr>
        <tr><td><strong>LPD Core (giosoftech.com)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Core banking data nasabah</td></tr>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-project-diagram" style="color:#7c3aed"></i><h3>Alur Layanan</h3></div>
    <div class="card-body">
      <p style="font-size:13px;font-weight:600;margin-bottom:8px">Mobile Banking iOS:</p>
      <div class="flow">
        <div class="flow-step">App Mobile</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">iosAccessMdw<br/><small>(Validasi Token/IP/AES)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Controller</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Helper Class</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SQL Server DB</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">SNAP Transfer-In BPD:</p>
      <div class="flow">
        <div class="flow-step">BPD Bank</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPCheckTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Post ke DB</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Nasabah +Saldo</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">ATM Cardless:</p>
      <div class="flow">
        <div class="flow-step">Mesin ATM</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineCheck<br/><small>(IP + Hash)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineController</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Update Folio/Mutasi</div>
      </div>
    </div>
  </div>
</section>

<!-- ARCHITECTURE -->
<section id="section-architecture" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-folder-open" style="color:#d97706"></i><h3>Struktur Direktori</h3></div>
    <div class="card-body">
      <pre>lpd_seminyak/
&#9500;&#9472;&#9472; app/
&#9474;   &#9500;&#9472;&#9472; Helpers/          # 7 helper class utama
&#9474;   &#9474;   &#9500;&#9472;&#9472; MBankingHelper.php    # Validasi akses, posting VA, enkripsi
&#9474;   &#9474;   &#9500;&#9472;&#9472; MobileHelper.php      # Login, register, ATM token
&#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPHelper.php        # Validasi signature SNAP BPD
&#9474;   &#9474;   &#9500;&#9472;&#9472; TabunganHelper.php    # Saldo, folio, PIN, daftar rek
&#9474;   &#9474;   &#9500;&#9472;&#9472; TransferHelper.php    # Validasi &amp; log transfer antar bank
&#9474;   &#9474;   &#9500;&#9472;&#9472; iosHelper.php         # Helper utama iOS mBanking (AES)
&#9474;   &#9474;   &#9492;&#9472;&#9472; iosTransferHelper.php # Transfer LPD, log, cek saldo
&#9474;   &#9500;&#9472;&#9472; Http/
&#9474;   &#9474;   &#9500;&#9472;&#9472; Controllers/          # 13 controller
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTokenCtrl.php          # Get access token iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosAccessCtrl.php         # Register/Login/Logout
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTabunganCtrl.php       # Daftar rek &amp; mutasi
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferLPDCtrl.php    # Transfer sesama LPD
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferBankCtrl.php   # Transfer ke bank lain
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBController.php     # Bayar PPOB FastPay
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBIAKController.php  # PPOB via IAK
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosMachineCtrl.php        # Token cardless iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; MachineController.php     # ATM Cardless
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; PPOBController.php        # Callback PPOB
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPTransferIn.php        # SNAP Inquiry &amp; Payment
&#9474;   &#9474;   &#9474;   &#9492;&#9472;&#9472; SNAPTokenTransferIn.php   # SNAP Access Token
&#9474;   &#9474;   &#9500;&#9472;&#9472; Middleware/          # 11 middleware
&#9474;   &#9474;   &#9492;&#9472;&#9472; Kernel.php
&#9500;&#9472;&#9472; config/app.php       # Load PEM keys + SNAP response codes
&#9500;&#9472;&#9472; keys/
&#9474;   &#9492;&#9472;&#9472; public_key.pem       # Public key LPD
&#9500;&#9472;&#9472; routes/api.php       # Semua route API
&#9500;&#9472;&#9472; .env                 # Konfigurasi environment
&#9500;&#9472;&#9472; bank.list            # Daftar kode bank nasional
&#9500;&#9472;&#9472; ppob.list            # Produk PPOB tersedia
&#9492;&#9472;&#9472; display.list         # Konfigurasi tampilan app</pre>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-map" style="color:#3b82f6"></i><h3>Peta Route API Lengkap</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path</th><th>Controller@Method</th><th>Middleware</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">/v1.0/access-token/b2b</span></td><td>SNAPTokenTransferIn@AccessToken</td><td>snapTokenIn</td><td>Token SNAP BPD</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/inquiry</span></td><td>SNAPTransferIn@Inquiry</td><td>snapTransferIn</td><td>SNAP Inquiry VA</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/payment</span></td><td>SNAPTransferIn@Payment</td><td>snapTransferIn</td><td>SNAP Payment VA</td></tr>
        <tr><td><span class="inline-code">/cardless/create-token</span></td><td>MachineController@CreateToken</td><td>machineCheck</td><td>Buat token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/get-token</span></td><td>MachineController@GetToken</td><td>machineCheck</td><td>Validasi token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/check-balance</span></td><td>MachineController@CekSaldo</td><td>machineCheck</td><td>Cek saldo ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-debit</span></td><td>MachineController@Penarikan</td><td>machineCheck</td><td>Tarik tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-credit</span></td><td>MachineController@Penyetoran</td><td>machineCheck</td><td>Setor tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-debit</span></td><td>MachineController@BatalTarik</td><td>machineCheck</td><td>Batal tarik</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-credit</span></td><td>MachineController@BatalSetor</td><td>machineCheck</td><td>Batal setor</td></tr>
        <tr><td><span class="inline-code">/ppob/callback</span></td><td>PPOBController@Callback</td><td>—</td><td>Callback PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/access-token</span></td><td>iosTokenCtrl@AccessToken</td><td>iosCheckToken</td><td>Token iOS</td></tr>
        <tr><td><span class="inline-code">/smart/access-key</span></td><td>iosTokenCtrl@AccessKey</td><td>iosCheckToken</td><td>Upload public key</td></tr>
        <tr><td><span class="inline-code">/smart/register</span></td><td>iosAccessCtrl@Register</td><td>iosCheckAccess</td><td>Registrasi nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/login</span></td><td>iosAccessCtrl@Login</td><td>iosCheckAccess</td><td>Login nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/logout</span></td><td>iosAccessCtrl@Logout</td><td>iosCheckAccess</td><td>Logout</td></tr>
        <tr><td><span class="inline-code">/smart/update-pass</span></td><td>iosAccessCtrl@UpdatePass</td><td>iosCheckAccess</td><td>Ganti password</td></tr>
        <tr><td><span class="inline-code">/smart/update-pin</span></td><td>iosAccessCtrl@UpdatePin</td><td>iosCheckAccess</td><td>Ganti PIN</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/account-list</span></td><td>iosTabunganCtrl@ListAccount</td><td>iosCheckAccess</td><td>Daftar rekening</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/transaction-history</span></td><td>iosTabunganCtrl@HistoryTransaction</td><td>iosCheckAccess</td><td>Riwayat transaksi</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/mutasi-history</span></td><td>iosTabunganCtrl@HistoryMutasi</td><td>iosCheckAccess</td><td>Mutasi rekening</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/check</span></td><td>iosTransferLPDCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/inquiry</span></td><td>iosTransferLPDCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/post</span></td><td>iosTransferLPDCtrl@Posting</td><td>iosCheckAccess</td><td>Posting transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/check</span></td><td>iosTransferBankCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek bank tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/inquiry</span></td><td>iosTransferBankCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/post</span></td><td>iosTransferBankCtrl@Posting</td><td>iosCheckAccess</td><td>Posting ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/check</span></td><td>iosPPOBController@Check</td><td>iosCheckAccess</td><td>Cek tagihan PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/request</span></td><td>iosPPOBController@Request</td><td>iosCheckAccess</td><td>Bayar PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/iak/check</span></td><td>iosPPOBIAKController@Check</td><td>iosCheckAccess</td><td>Cek tagihan IAK</td></tr>
        <tr><td><span class="inline-code">/smart/iak/request</span></td><td>iosPPOBIAKController@Request</td><td>iosCheckAccess</td><td>Bayar via IAK</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- INSTALL -->
<section id="section-install" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-server" style="color:#3b82f6"></i><h3>Persyaratan Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <table>
            <tr><th>Komponen</th><th>Versi</th></tr>
            <tr><td>PHP</td><td>7.0 – 7.4 <span class="badge badge-yellow">Wajib 7.4</span></td></tr>
            <tr><td>Microsoft SQL Server</td><td>2014 / 2016+</td></tr>
            <tr><td>Composer</td><td>2.x</td></tr>
            <tr><td>Web Server</td><td>Apache / Nginx</td></tr>
            <tr><td>PHP Extension</td><td>pdo_sqlsrv, mbstring, openssl, curl</td></tr>
            <tr><td>ODBC Driver</td><td>Microsoft ODBC Driver 17/18</td></tr>
          </table>
        </div>
        <div>
          <div class="info-box info-yellow">
            <i class="fas fa-exclamation-triangle"></i>
            <span><strong>Penting:</strong> PHP 8.x TIDAK kompatibel! Gunakan PHP 7.4. IP server harus terdaftar di whitelist BPD Bali dan GIO.</span>
          </div>
          <div class="info-box info-red" style="margin-top:8px">
            <i class="fas fa-ban"></i>
            <span>Database hanya mendukung <strong>Microsoft SQL Server</strong>. MySQL/MariaDB/PostgreSQL tidak didukung.</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-list-check" style="color:#10b981"></i><h3>Langkah Instalasi Lengkap</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install PHP 7.4 dan ekstensi yang dibutuhkan</h4>
            <p>Sistem memerlukan PHP 7.x. PHP 8.x tidak kompatibel.</p>
            <pre>${codeSnippets.installPhp}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Install ODBC Driver dan ekstensi PHP SQL Server</h4>
            <p>Driver Microsoft ODBC wajib untuk koneksi ke SQL Server.</p>
            <pre>${codeSnippets.installOdbc}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>Extract Source Code ke Server</h4>
            <pre>${codeSnippets.extractCode}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-content">
            <h4>Install Dependency via Composer</h4>
            <pre>${codeSnippets.composerInstall}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <div class="step-content">
            <h4>Siapkan File .env</h4>
            <pre>${codeSnippets.envSetup}</pre>
            <p style="margin-top:8px">Konfigurasi minimal yang harus diubah:</p>
            <pre>${codeSnippets.envMinimal}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">6</div>
          <div class="step-content">
            <h4>Setup Folder Keys (Kunci Kriptografi)</h4>
            <pre>${codeSnippets.keysSetup}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">7</div>
          <div class="step-content">
            <h4>Set Permission Storage dan Bootstrap</h4>
            <pre>${codeSnippets.permissions}</pre>
            <p style="margin-top:8px">Buat direktori log yang diperlukan:</p>
            <pre>mkdir -p storage/logs/token storage/logs/transfer-in/inquiry
mkdir -p storage/logs/transfer-in/posting storage/logs/access
mkdir -p storage/logs/tabungan storage/logs/transfer-AR
mkdir -p storage/logs/transfer-AB storage/logs/ppob</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">8</div>
          <div class="step-content">
            <h4>Setup Database SQL Server</h4>
            <p>Buat database dan semua tabel yang diperlukan di SQL Server:</p>
            <pre>${codeSnippets.dbSchema}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">9</div>
          <div class="step-content">
            <h4>Konfigurasi Web Server Apache</h4>
            <pre>${codeSnippets.apacheConf}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">10</div>
          <div class="step-content">
            <h4>Verifikasi Instalasi</h4>
            <pre>${codeSnippets.verify}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-windows" style="color:#3b82f6"></i><h3>Instalasi di Windows (XAMPP)</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install XAMPP PHP 7.4 + SQL Server Driver</h4>
            <pre>1. Download XAMPP dengan PHP 7.4
2. Download php_sqlsrv_74_nts.dll dan php_pdo_sqlsrv_74_nts.dll
   dari: https://docs.microsoft.com/en-us/sql/connect/php/
3. Letakkan DLL di C:\\xampp\\php\\ext\\
4. Tambahkan di php.ini:
   extension=php_sqlsrv_74_nts.dll
   extension=php_pdo_sqlsrv_74_nts.dll
5. Install Microsoft ODBC Driver 17 for SQL Server</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Tempatkan Project dan Konfigurasi .env</h4>
            <pre>1. Ekstrak ke C:\\xampp\\htdocs\\lpd_seminyak
2. Buat .env dari .env.example
3. Update path di .env (gunakan forward slash):
   PUBLIC_KEY_LPD=c:/xampp/htdocs/lpd_seminyak/keys/public_key.pem
   MASTER_BANK_LIST=c:/xampp/htdocs/lpd_seminyak/bank.list
4. Jalankan: composer install --ignore-platform-reqs
5. Jalankan: php artisan key:generate</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONFIG -->
<section id="section-config" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-cog" style="color:#64748b"></i><h3>Referensi Lengkap Variabel .env</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Aplikasi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Contoh</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">APP_NAME</span></td><td>LPD Seminyak</td><td>Nama aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_ENV</span></td><td>local / production</td><td>Environment</td></tr>
        <tr><td><span class="inline-code">APP_KEY</span></td><td>base64:xxx</td><td>Generate dengan php artisan key:generate</td></tr>
        <tr><td><span class="inline-code">APP_DEBUG</span></td><td>false</td><td>false di production</td></tr>
        <tr><td><span class="inline-code">APP_URL</span></td><td>https://lpdseminyak.biz.id:8000</td><td>URL dasar aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_STATUS</span></td><td>Production</td><td>Indikator status</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Database SQL Server</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Nilai</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">DB_CONNECTION</span></td><td>sqlsrv</td><td>WAJIB sqlsrv (bukan mysql)</td></tr>
        <tr><td><span class="inline-code">DB_HOST</span></td><td>localhost</td><td>Hostname SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PORT</span></td><td>1433</td><td>Port default SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_DATABASE</span></td><td>Giosoft_LPD</td><td>Nama database</td></tr>
        <tr><td><span class="inline-code">DB_USERNAME</span></td><td>sa</td><td>Username SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PASSWORD</span></td><td>#sa?seminyak</td><td>Password SQL Server</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Path File Kunci dan List</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_LPD</span></td><td>Path absolut public_key.pem LPD – untuk verifikasi tanda tangan iOS</td></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_BPD</span></td><td>Path absolut public_key_bpd.pem – verifikasi SNAP signature</td></tr>
        <tr><td><span class="inline-code">MASTER_BANK_LIST</span></td><td>Path ke bank.list – daftar kode bank nasional</td></tr>
        <tr><td><span class="inline-code">MASTER_PPOB_LIST</span></td><td>Path ke ppob.list – daftar produk PPOB tersedia</td></tr>
        <tr><td><span class="inline-code">MASTER_DISPLAY_LIST</span></td><td>Path ke display.list – konfigurasi menu tampilan app</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">BPD Bali Integration</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">BPD_URL</span></td><td>Base URL production BPD: https://ibank.bpdbali.id/virtualAccount/</td></tr>
        <tr><td><span class="inline-code">BPD_URL_DEV</span></td><td>Base URL dev BPD: https://dev.bpdbali.id:8443/openapi</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX</span></td><td>989191 – Prefix VA production</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX_DEV</span></td><td>989067 – Prefix VA dev</td></tr>
        <tr><td><span class="inline-code">BPD_HASHCODE</span></td><td>Secret hashcode untuk signing request ke BPD</td></tr>
        <tr><td><span class="inline-code">BPD_STATICIP1..7</span></td><td>IP statis BPD yang diizinkan</td></tr>
        <tr><td><span class="inline-code">BPD_WHITE_LIST</span></td><td>Format: |ip1|ip2|ip3|</td></tr>
        <tr><td><span class="inline-code">CLIENT_SECRET</span></td><td>Secret untuk HMAC-SHA512 SNAP signing</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Limit Transaksi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Default</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">SALDO_MIN</span></td><td>50000</td><td>Saldo minimum tersisa setelah transaksi (Rp)</td></tr>
        <tr><td><span class="inline-code">MIN_TRANSFER</span></td><td>10000</td><td>Minimum nominal transfer (Rp)</td></tr>
        <tr><td><span class="inline-code">MAX_TRANSFER</span></td><td>1000000</td><td>Maksimum transfer per transaksi (Rp)</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">PPOB</h4>
      <table>
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PPOB_USER / PPOB_PIN</span></td><td>Kredensial FastPay</td></tr>
        <tr><td><span class="inline-code">IAK_USER / IAK_KEY</span></td><td>Kredensial IAK production</td></tr>
        <tr><td><span class="inline-code">IAK_PREPAID_URL</span></td><td>https://prepaid.iak.id/api/top-up</td></tr>
        <tr><td><span class="inline-code">IAK_POSTPAID_URL</span></td><td>https://mobilepulsa.net/api/v1/bill/check</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- AUTH -->
<section id="section-auth" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-key" style="color:#d97706"></i><h3>Sistem Autentikasi</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">1. iOS mBanking Token</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Dibuat di endpoint <span class="inline-code">/smart/access-token</span></li>
            <li>Disimpan di tabel <span class="inline-code">gmob_token</span></li>
            <li>Valid selama <strong>3 menit</strong></li>
            <li>Header: <span class="inline-code">Authorization: Bearer &lt;token&gt;</span></li>
            <li>Divalidasi oleh middleware <span class="inline-code">iosCheckAccess</span></li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">2. SNAP BPD Token (OAuth2 B2B)</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Endpoint: <span class="inline-code">/v1.0/access-token/b2b</span></li>
            <li>Signature: HMAC-SHA512 dari (method:endpoint:token:bodyHash:timestamp)</li>
            <li>IP whitelist BPD Bali wajib cocok</li>
            <li>Divalidasi middleware <span class="inline-code">snapTransferIn</span></li>
          </ul>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Endpoint: GET ACCESS TOKEN (iOS)</h4>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/smart/access-token</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Dapatkan token akses sesi iOS</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <p style="font-size:13px;margin-bottom:8px">Middleware: <span class="badge badge-blue">iosCheckToken</span></p>
          <table style="margin-bottom:12px">
            <tr><th>Header</th><th>Format</th><th>Keterangan</th></tr>
            <tr><td><span class="inline-code">X-CLIENT-ID</span></td><td>Terenkripsi</td><td>Device ID nasabah</td></tr>
            <tr><td><span class="inline-code">X-TIMESTAMP</span></td><td>ISO 8601</td><td>Waktu request</td></tr>
            <tr><td><span class="inline-code">X-SIGNATURE</span></td><td>Base64 RSA-SHA256</td><td>Signature dengan private key app</td></tr>
          </table>
          <pre>// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "signature": "base64_signature"
}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS ACCESS -->
<section id="section-ios-access" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-user-plus" style="color:#3b82f6"></i><h3>iOS – Registrasi, Login, Logout</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/register</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Daftarkan perangkat nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Nasabah harus sudah ada di <span class="inline-code">gmob_nasabah</span> dengan status 'R' (Registered belum aktif). Saat registrasi, IMEI device disimpan dan status diubah ke 'A'.</span></div>
          <pre>// Request Headers:
Authorization: Bearer &lt;access_token&gt;
X-TIMESTAMP: 2025-01-01T10:00:00+07:00
X-SIGNATURE: &lt;hmac_sha512&gt;
X-CLIENT-ID: &lt;device_imei_encrypted&gt;

// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "customer_id": "enc_noid",
  "customer_name": "Nama Nasabah",
  "customer_pin": "enc_pin",
  "account_list": "enc_[norek#nama#saldo#produk]",
  "bank_key": "enc_BPD_PREFIX&lt;&gt;BPD_HASHCODE",
  "bank_list": "kode1-nama1#kode2-nama2#...",
  "ppob_list": "TYPE;CODE;NAME;NOMINAL;ADMIN#..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Sukses – status berubah ke A</td></tr>
          <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan / status bukan R</td></tr>
          <tr><td><span class="badge badge-red">68</span></td><td>Timeout</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/login</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Login nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Validasi: imei_code + username + pass_crypto dari gmob_nasabah
// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "account_list": "enc_daftar_rekening",
  "bank_key": "enc_key",
  "bank_list": "...",
  "ppob_list": "..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Login berhasil</td></tr>
          <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
          <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir (status B)</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/logout</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Update gmob_token: status = 'closed', end_time = CURRENT_TIMESTAMP
{ "status": "00", "message": "Logout berhasil." }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pass</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti password</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pass_old=enc_old&amp;pass_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"Kata sandi tidak sama."}</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pin</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti PIN transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pin_old=enc_old&amp;pin_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"PIN tidak sama."}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TABUNGAN -->
<section id="section-ios-tabungan" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-piggy-bank" style="color:#10b981"></i><h3>iOS – Layanan Tabungan</h3></div>
    <div class="card-body">
      <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Semua endpoint tabungan memerlukan middleware <strong>iosCheckAccess</strong>. Data yang dikembalikan dienkripsi AES-256-CBC.</span></div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/account-list</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil semua rekening dari gmob_rekening berdasarkan noid
// Saldo diambil real-time dari gtb_folio (SUM credit-debit)
// Format data setelah dekripsi:
[norek#nama_nasabah#saldo#jenis_produk]
// Contoh: [01234567890#I KETUT WIRA#2500000#Tabungan]

// Status error: 84 = data tidak ada, 01 = tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/transaction-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), start_date, end_date
// Query ke gtb_folio JOIN gum_kdtrs
// Format respon: [tgl#debval#trans_no#amount#keterangan]</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/mutasi-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil mutasi dari gak_mutasi / tabel dinamis gte_folio, gtf_folio, dll
// berdasarkan prefix nomor rekening (10/11=Takamas, 20=Sipura, dll)
// Respon terenkripsi AES</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER LPD -->
<section id="section-ios-transfer-lpd" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-exchange-alt" style="color:#7c3aed"></i><h3>iOS – Transfer Sesama Nasabah LPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;line-height:1.8;margin-bottom:16px">
        3 tahap: <strong>Check &rarr; Inquiry &rarr; Posting</strong>. Setiap tahap memvalidasi hash SHA-256.
      </p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_to (enc nomor rekening tujuan)
// Respon: { "status":"00", "product_type":"Tabungan", "customer_name":"Nama" }
// Error: 01 = rekening tujuan tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash formula: SHA-256(from+to+amount+namaDari+namaTujuan+remark+BPD_HASHCODE)
{
  "account_from": "enc_norek_asal",
  "account_to": "enc_norek_tujuan",
  "amount": "enc_nominal",
  "name_from": "enc_nama_pengirim",
  "name_to": "enc_nama_penerima",
  "remark": "enc_keterangan",
  "hash_code": "sha256_hash"
}
// Sukses: { "status":"00", "balance": 2500000 }
// Error: 62=hash salah, 01=tdk aktif, 04=saldo kurang, 25=min, 26=limit</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan field: ref_no (referensi unik), pin (enc)
// Proses: insert ke gmob_transfer, update folio &amp; mutasi
// Sukses: { "status":"00", "trans_no":"REF123", "amount":500000, "balance":2000000 }
// Error: 63=hash salah, 23=duplikat ref, 24=gagal proses</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER BANK -->
<section id="section-ios-transfer-bank" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-landmark" style="color:#3b82f6"></i><h3>iOS – Transfer ke Bank Lain via BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Transfer dari rekening LPD ke bank lain (BNI, BRI, Mandiri, dll) melalui jaringan BPD Bali. Biaya transfer dari tabel <span class="inline-code">gcore_bankcode</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: bank_code, account_to (enc), hash_code
// Proses: request ke BPD Account Inquiry External
// Respon: { "status":"00", "account_name":"NAMA PENERIMA", "bank_name":"BNI" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash: SHA-256(from+bankCode+to+amount+BPD_HASHCODE)
// Respon: { "status":"00", "transfer_cost":6500, "balance":2500000 }
// Error: 51/52/53=hash salah, 40=saldo kurang</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Alur: Debit folio LPD -&gt; Kirim ke BPD API -&gt; Catat gcore_transfer
// BPD response code sukses: 2001800
// Error: 45=duplikat ref, 68=BPD timeout</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS PPOB -->
<section id="section-ios-ppob" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bolt" style="color:#d97706"></i><h3>iOS – PPOB (Pembayaran Tagihan &amp; Pulsa)</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Gateway: <strong>FastPay (RajaBiller)</strong> dan <strong>IAK</strong>. Fee admin: <strong>Rp 2.000</strong>/transaksi.</p>
      <h4 style="font-weight:700;font-size:13px;margin-bottom:8px">Produk yang didukung:</h4>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        <span class="badge badge-blue">PLN Prabayar/Pascabayar</span>
        <span class="badge badge-blue">PDAM</span>
        <span class="badge badge-blue">BPJS Kesehatan</span>
        <span class="badge badge-blue">Telkom</span>
        <span class="badge badge-blue">Paket Internet</span>
        <span class="badge badge-blue">Pulsa (Prepaid)</span>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), product_code, customer_id (enc)
// Endpoint FastPay: POST https://rajabiller.fastpay.co.id/transaksi/api_json.php
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "customer_name":"NAMA" }
// Error: 04=saldo kurang, 05=deposit PPOB kurang, 26=limit harian</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan: nominal (enc), hash_code, pin (enc)
// Proses: validasi -&gt; create gmob_payment -&gt; call FastPay API -&gt; update folio
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "remark":"PLN|ID|TOKEN" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/iak/check &amp; /smart/iak/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// IAK API (idalamat.com):
// Prepaid: POST https://prepaid.iak.id/api/top-up
// Postpaid: POST https://mobilepulsa.net/api/v1/bill/check
// Signature IAK: MD5(username + apikey + ref_id)
// Respon format sama dengan /ppob/*</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SNAP -->
<section id="section-snap" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-plug" style="color:#3b82f6"></i><h3>SNAP BI – Transfer Masuk via VA BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Implementasi <strong>SNAP BI (Standar Nasional Open API Pembayaran)</strong> untuk menerima transfer dari bank lain menggunakan Virtual Account BPD. Prefix VA production: <span class="inline-code">989191</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/access-token/b2b</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: X-TIMESTAMP, X-CLIENT-KEY, X-SIGNATURE
// Body: { "grantType": "client_credentials" }
// Respon: {
//   "responseCode": "2002500",
//   "accessToken": "token_string",
//   "tokenType": "BearerToken",
//   "expiresIn": 900
// }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/inquiry</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 24</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: Authorization: Bearer &lt;token&gt;, X-TIMESTAMP, X-SIGNATURE
// X-PARTNER-ID, X-EXTERNAL-ID
// HMAC-SHA512: POST:/v1.0/transfer-va/inquiry:token:sha256(body):timestamp

// Body:
{
  "partnerServiceId": "  989191",
  "customerNo": "012345678901234",
  "virtualAccountNo": "989191012345678901234",
  "inquiryRequestId": "unique-id",
  "amount": { "value": "500000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "01", "terminalId": "ATM001" }
}

// Sukses (200): responseCode: "2002400"
// virtualAccountName: nama nasabah, inquiryStatus: "00"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/payment</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 25</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: kredit nasabah di gtb_folio + gak_mutasi + gcore_transfer
// Body: paymentRequestId, paidAmount, sourceAccountNo, referenceNo
// Sukses (200): responseCode: "2002500", paymentFlagStatus: "00"</pre>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Kode Respons SNAP:</h4>
      <table>
        <tr><th>Code</th><th>Arti</th></tr>
        <tr><td>2002400 / 2002500</td><td>Sukses inquiry / payment</td></tr>
        <tr><td>4002400</td><td>Missing mandatory field</td></tr>
        <tr><td>4012400</td><td>Invalid signature</td></tr>
        <tr><td>4012401</td><td>Invalid access token</td></tr>
        <tr><td>4032400</td><td>IP tidak dikenal</td></tr>
        <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
        <tr><td>4092401</td><td>Duplicate reference</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- ATM -->
<section id="section-atm" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-credit-card" style="color:#ea580c"></i><h3>ATM Cardless – Setor &amp; Tarik Tanpa Kartu</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Hash: <strong>SHA-256(ATM_HASHCODE + token + account_no + transaction_datetime)</strong>. IP harus ada di ATM_WHITE_LIST.</span>
      </div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/create-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari app mobile iOS, buat token 6 digit untuk digunakan di ATM
// Request: account_no, token, hash_code
// Proses: insert/update gmob_token status='open'
// Respon: { "status":"00", "data":"TOKEN6DIGIT" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/get-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari ATM, validasi token yang dimasukkan nasabah
// Request: token, transaction_code (01=tarik, 02=setor), hash_code
// Respon: { "status":"00", "account_no":"norek", "customer_name":"NAMA" }
// Error: 30=hash salah, 40=IP tidak dikenal</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-debit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Tarik tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no, token, amount, transaction_datetime, hash_code
// Proses: kurangi saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":2000000 }
// Error: 61=saldo kurang, 14=rekening tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Setor tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: tambah saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":3000000 }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/reversal-debit &amp; /reversal-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Batal transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hapus record folio &amp; mutasi yang sudah diproses
// Request: account_no, token, trans_no, hash_code
// Respon: { "responseCode": "00" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PPOB CALLBACK -->
<section id="section-ppob-callback" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-reply" style="color:#64748b"></i><h3>PPOB Callback</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/ppob/callback</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Menerima callback dari FastPay / provider PPOB
// Selalu mengembalikan:
{ "status": "99", "rc": "&lt;rc_dari_provider&gt;" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DATABASE -->
<section id="section-database" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-database" style="color:#3b82f6"></i><h3>Skema Database SQL Server: Giosoft_LPD</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Beberapa query lintas database: <span class="inline-code">Giosoft_Dev.dbo.gtb_folio</span></span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="db-table">
          <div class="db-table-header">gmob_nasabah</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">noid</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">ID unik nasabah</span></div>
            <div class="db-col"><span class="db-col-name">nama</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nama nasabah</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening utama</span></div>
            <div class="db-col"><span class="db-col-name">username</span><span class="db-col-type">varchar</span><span class="db-col-desc">Username login</span></div>
            <div class="db-col"><span class="db-col-name">pass_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">Password (md5)</span></div>
            <div class="db-col"><span class="db-col-name">pin_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">PIN transaksi</span></div>
            <div class="db-col"><span class="db-col-name">imei_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / device ID</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">char(1)</span><span class="db-col-desc">R=Register A=Aktif B=Blokir</span></div>
            <div class="db-col"><span class="db-col-name">aes_key</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kunci AES-256 per perangkat</span></div>
            <div class="db-col"><span class="db-col-name">aes_iv</span><span class="db-col-type">varchar</span><span class="db-col-desc">IV AES</span></div>
            <div class="db-col"><span class="db-col-name">max_transfer</span><span class="db-col-type">bigint</span><span class="db-col-desc">Limit transfer harian</span></div>
            <div class="db-col"><span class="db-col-name">scramble_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode scramble enkripsi</span></div>
            <div class="db-col"><span class="db-col-name">version</span><span class="db-col-type">varchar</span><span class="db-col-desc">Versi app iOS nasabah</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gmob_token</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">id</span><span class="db-col-type">int PK</span><span class="db-col-desc">Auto increment</span></div>
            <div class="db-col"><span class="db-col-name">account_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / noid nasabah</span></div>
            <div class="db-col"><span class="db-col-name">token</span><span class="db-col-type">varchar</span><span class="db-col-desc">Token string</span></div>
            <div class="db-col"><span class="db-col-name">date_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu pembuatan</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">varchar</span><span class="db-col-desc">open/closed</span></div>
            <div class="db-col"><span class="db-col-name">end_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu logout</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gtb_folio</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">linker</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening</span></div>
            <div class="db-col"><span class="db-col-name">mutasi_date</span><span class="db-col-type">date</span><span class="db-col-desc">Tanggal audit</span></div>
            <div class="db-col"><span class="db-col-name">trans_date</span><span class="db-col-type">datetime</span><span class="db-col-desc">Tanggal transaksi</span></div>
            <div class="db-col"><span class="db-col-name">debit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah debit</span></div>
            <div class="db-col"><span class="db-col-name">credit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah kredit</span></div>
            <div class="db-col"><span class="db-col-name">saldo</span><span class="db-col-type">decimal</span><span class="db-col-desc">Saldo setelah transaksi</span></div>
            <div class="db-col"><span class="db-col-name">trans_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi</span></div>
            <div class="db-col"><span class="db-col-name">remark</span><span class="db-col-type">varchar</span><span class="db-col-desc">Keterangan (max 50)</span></div>
            <div class="db-col"><span class="db-col-name">debit_val</span><span class="db-col-type">char(1)</span><span class="db-col-desc">T=debit F=kredit</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gcore_transfer</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">transfer_code</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">Kode unik transfer</span></div>
            <div class="db-col"><span class="db-col-name">transfer_type</span><span class="db-col-type">varchar</span><span class="db-col-desc">IN/OUT</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Rekening LPD</span></div>
            <div class="db-col"><span class="db-col-name">amount</span><span class="db-col-type">decimal</span><span class="db-col-desc">Nominal</span></div>
            <div class="db-col"><span class="db-col-name">referenceNumber</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi BPD</span></div>
            <div class="db-col"><span class="db-col-name">responseCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode respons</span></div>
            <div class="db-col"><span class="db-col-name">destinationBankCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode bank tujuan</span></div>
          </div>
        </div>
      </div>
      <h4 style="font-weight:700;margin:16px 0 8px;font-size:14px">Tabel Pendukung Lainnya:</h4>
      <table>
        <tr><th>Tabel</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">gmob_transfer</span></td><td>Transfer sesama LPD (AR)</td></tr>
        <tr><td><span class="inline-code">gmob_payment</span></td><td>Transaksi PPOB</td></tr>
        <tr><td><span class="inline-code">gmob_rekening</span></td><td>Daftar rekening per nasabah</td></tr>
        <tr><td><span class="inline-code">gmob_responcode</span></td><td>Master kode dan pesan respons</td></tr>
        <tr><td><span class="inline-code">gmob_counter</span></td><td>Counter nomor referensi per periode</td></tr>
        <tr><td><span class="inline-code">gum_config</span></td><td>Tanggal audit + limit transfer global</td></tr>
        <tr><td><span class="inline-code">gak_mutasi</span></td><td>Mutasi GL akuntansi</td></tr>
        <tr><td><span class="inline-code">gak_bookstatus</span></td><td>Status buka/tutup buku harian</td></tr>
        <tr><td><span class="inline-code">gcore_bankcode</span></td><td>Kode bank + biaya transfer</td></tr>
        <tr><td><span class="inline-code">gcore_log</span></td><td>Log detail transaksi VA</td></tr>
        <tr><td><span class="inline-code">gppob_produk</span></td><td>Master produk PPOB</td></tr>
        <tr><td><span class="inline-code">gtb_nasabah</span></td><td>Data nasabah tabungan core</td></tr>
        <tr><td><span class="inline-code">gkr_debitor</span></td><td>Data debitur (pinjaman)</td></tr>
        <tr><td><span class="inline-code">gdp_deposan</span></td><td>Data deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- RESPONSE CODES -->
<section id="section-response-codes" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-list-ol" style="color:#3b82f6"></i><h3>Daftar Kode Respons Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">iOS mBanking:</h4>
          <table>
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">01</span></td><td>Rekening tidak aktif</td></tr>
            <tr><td><span class="badge badge-red">04</span></td><td>Saldo tidak cukup</td></tr>
            <tr><td><span class="badge badge-red">05</span></td><td>Deposit PPOB kurang</td></tr>
            <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan</td></tr>
            <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
            <tr><td><span class="badge badge-red">23</span></td><td>Referensi duplikat</td></tr>
            <tr><td><span class="badge badge-red">24</span></td><td>Gagal memproses</td></tr>
            <tr><td><span class="badge badge-red">25</span></td><td>Nominal di bawah minimum</td></tr>
            <tr><td><span class="badge badge-red">26</span></td><td>Melebihi limit harian</td></tr>
            <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir</td></tr>
            <tr><td><span class="badge badge-red">51/52/53</span></td><td>Hash mismatch (check/inquiry/post)</td></tr>
            <tr><td><span class="badge badge-red">54</span></td><td>PIN salah</td></tr>
            <tr><td><span class="badge badge-red">62/63</span></td><td>Hash LPD (inquiry/posting)</td></tr>
            <tr><td><span class="badge badge-red">68</span></td><td>Timeout / error internal</td></tr>
            <tr><td><span class="badge badge-red">84</span></td><td>Data tidak ditemukan</td></tr>
          </table>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">ATM Cardless:</h4>
          <table style="margin-bottom:16px">
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">14</span></td><td>Status rekening tidak valid</td></tr>
            <tr><td><span class="badge badge-red">30</span></td><td>Hash code salah</td></tr>
            <tr><td><span class="badge badge-red">40</span></td><td>IP tidak ada di whitelist</td></tr>
            <tr><td><span class="badge badge-red">61</span></td><td>Saldo tidak cukup</td></tr>
          </table>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">SNAP BI:</h4>
          <table>
            <tr><th>Code</th><th>Arti</th></tr>
            <tr><td>2002400/2002500</td><td>Sukses inquiry/payment</td></tr>
            <tr><td>4002400</td><td>Missing mandatory field</td></tr>
            <tr><td>4012400</td><td>Invalid signature</td></tr>
            <tr><td>4012401</td><td>Invalid access token</td></tr>
            <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
            <tr><td>4092401</td><td>Duplicate reference</td></tr>
            <tr><td>5002500</td><td>General error</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECURITY -->
<section id="section-security" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-shield-alt" style="color:#10b981"></i><h3>Mekanisme Keamanan &amp; Enkripsi</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;color:#1d4ed8">1. AES-256-CBC per Perangkat (iOS)</h4>
      <pre>// Key dibuat saat registrasi, disimpan di gmob_nasabah:
$key = md5($timestamp . $clientID . "KEY");
$iv  = md5($timestamp . $clientID . "IV");
$cs  = md5($timestamp . $clientID . "CS");

// Enkripsi: openssl_encrypt(data, AES-256-CBC, key, RAW, iv) -&gt; base64
// Dekripsi: base64_decode -&gt; openssl_decrypt(...)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">2. RSA Signature Verifikasi (iosTokenCtrl)</h4>
      <pre>// Saat get access token:
$strToSign = $clientID . "|" . $timestamp;
$isValid = openssl_verify($strToSign, base64_decode($signature),
  config('app.public_key_lpd'), OPENSSL_ALGO_SHA256);
// Public key dimuat dari env PUBLIC_KEY_LPD saat boot</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">3. HMAC-SHA512 (SNAP &amp; mBanking)</h4>
      <pre>// SNAP Transfer VA:
$strToSign = "POST:" . $endpoint . ":" . $token . ":" . sha256(body) . ":" . $timestamp;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET, true));

// mBanking access:
$strToSign = $partnerID . "|" . $accessToken;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET));</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">4. SHA-256 Hash Validasi Transfer</h4>
      <pre>// Transfer LPD Inquiry:
SHA-256(fromNorek + toNorek + amount + fromName + toName + remark + BPD_HASHCODE)

// Transfer Bank:
SHA-256(fromNorek + bankCode + toNorek + amount + BPD_HASHCODE)

// ATM:
SHA-256(ATM_HASHCODE + token + accountNo + datetime)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">5. Whitelist IP per Layanan</h4>
      <table>
        <tr><th>Layanan</th><th>Env Variable</th><th>Middleware</th></tr>
        <tr><td>SNAP BPD</td><td>BPD_STATICIP1..7</td><td>SNAPCheckTransferIn</td></tr>
        <tr><td>Mobile Banking</td><td>BPD_WHITE_LIST + GIO_WHITE_LIST</td><td>iosAccessMdw</td></tr>
        <tr><td>ATM Cardless</td><td>GIO_WHITE_LIST + ATM_WHITE_LIST</td><td>MachineCheck</td></tr>
      </table>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">6. Pembatasan Waktu Layanan</h4>
      <pre>// Di iosAccessMdw::check_access():
// Transfer diblokir: 00:00 - 05:00 (jam 0-4)
// PPOB diblokir:     01:00 - 03:00 (jam 1-2)</pre>
    </div>
  </div>
</section>

<!-- MIDDLEWARE -->
<section id="section-middleware" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-filter" style="color:#7c3aed"></i><h3>Daftar Middleware</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Alias</th><th>Class</th><th>Digunakan Untuk</th><th>Validasi</th></tr>
        <tr><td><span class="inline-code">iosCheckToken</span></td><td>iosTokenMdw</td><td>/smart/access-token</td><td>Signature RSA, client ID, IP</td></tr>
        <tr><td><span class="inline-code">iosCheckAccess</span></td><td>iosAccessMdw</td><td>Semua /smart/*</td><td>Token 3 menit, IP, URL, jam, AES keys</td></tr>
        <tr><td><span class="inline-code">snapTokenIn</span></td><td>SNAPCheckTokenIn</td><td>/v1.0/access-token/b2b</td><td>Field grantType</td></tr>
        <tr><td><span class="inline-code">snapTransferIn</span></td><td>SNAPCheckTransferIn</td><td>/v1.0/transfer-va/*</td><td>HMAC-SHA512, token, IP BPD</td></tr>
        <tr><td><span class="inline-code">machineCheck</span></td><td>MachineCheck</td><td>/cardless/*</td><td>IP whitelist ATM, SHA-256 hash</td></tr>
      </table>
      <div class="info-box info-blue" style="margin-top:16px">
        <i class="fas fa-info-circle"></i>
        <div>
          <strong>Alur iosAccessMdw:</strong>
          <ol style="margin-top:8px;padding-left:16px;line-height:2;font-size:12px">
            <li>Init global params via <span class="inline-code">iosHelper::Gio_SetParam()</span></li>
            <li>Tentukan log path berdasarkan URI</li>
            <li>Insert log request ke file harian (storage/logs/)</li>
            <li>Buat atau ambil AES key/IV/CS dari DB per device</li>
            <li>Ekstrak headers: X-CLIENT-ID, X-TIMESTAMP, X-PARTNER-ID</li>
            <li>Validasi via check_access(): partner, token(3mnt), IP, URL, jam</li>
            <li>Set $_POST['status'] dan $_POST['message']</li>
            <li>Teruskan request ke controller</li>
            <li>Tambahkan CORS headers ke response</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HELPERS -->
<section id="section-helpers" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-tools" style="color:#ea580c"></i><h3>Deskripsi Helper Classes</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Helper</th><th>Ukuran</th><th>Fungsi Utama</th></tr>
        <tr>
          <td><strong>MBankingHelper</strong></td><td>~25KB</td>
          <td>checkAccess() SNAP/mBanking, Gio_PostTransferVA(), enkripsi Gio_Encrypt/Decrypt/Decode(), Gio_InsertIntoFolio/Mutasi(), logging</td>
        </tr>
        <tr>
          <td><strong>MobileHelper</strong></td><td>~16KB</td>
          <td>Check_Register/Login/OTP(), Change_Password/PIN(), ATM_GetToken/ValidToken(), Gio_InsertIntoFolio/Mutasi(), Gio_GetNoReferensi()</td>
        </tr>
        <tr>
          <td><strong>SNAPHelper</strong></td><td>~16KB</td>
          <td>checkTransferVA() validasi SNAP, Gio_PostTransferVA(), log per external ID, Gio_CheckToken(), Gio_GetReferenceVA()</td>
        </tr>
        <tr>
          <td><strong>TabunganHelper</strong></td><td>~14KB</td>
          <td>Check_StatusTabungan/Rekening(), Get_FolioTabungan/Pinjaman/Deposito(), Gio_CheckSaldo/Pin(), GetModulCode(), Gio_InsTransaksiPPOB()</td>
        </tr>
        <tr>
          <td><strong>TransferHelper</strong></td><td>~9KB</td>
          <td>checkTransferIn() (legacy), Gio_GetNasabah() cari by VA, Gio_InqTransferIn/PostTransferIn(), Ins_TransferAR(), logging</td>
        </tr>
        <tr>
          <td><strong>iosHelper</strong></td><td>~14KB</td>
          <td>Gio_CheckToken() 3 menit, Gio_CreateKeyAndIv/GetKeyAndIv(), Gio_Encrypt/Decrypt() AES, Get_DaftarRek(), Gio_GetConfig(), Gio_SetParam()</td>
        </tr>
        <tr>
          <td><strong>iosTransferHelper</strong></td><td>~7KB</td>
          <td>Ins_TransferAR(), Gio_CheckSaldo() + limit, Gio_CheckPIN(), Gio_InsTransferARLog(), Gio_InsTransferVALog(), Get_TransferCost()</td>
        </tr>
      </table>
      <h4 style="font-weight:700;font-size:14px;margin-top:20px;margin-bottom:8px">Modul Rekening (GetModulCode / prefix norek):</h4>
      <table>
        <tr><th>Prefix</th><th>Kode Modul</th><th>Jenis Rekening</th></tr>
        <tr><td>01, 02, 03 (lainnya)</td><td>b</td><td>Tabungan</td></tr>
        <tr><td>10, 11</td><td>e</td><td>Takamas (tabungan khusus)</td></tr>
        <tr><td>20</td><td>f</td><td>Sipura</td></tr>
        <tr><td>30</td><td>g</td><td>Sitirta</td></tr>
        <tr><td>40</td><td>h</td><td>Simapan</td></tr>
        <tr><td>33, 34</td><td>D</td><td>Deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- TROUBLESHOOT -->
<section id="section-troubleshoot" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bug" style="color:#ef4444"></i><h3>Panduan Troubleshooting</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: "could not find driver" (SQL Server)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Install ODBC Driver 17 + ekstensi PHP sqlsrv:
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
sudo ACCEPT_EULA=Y apt-get install msodbcsql17 unixodbc-dev
sudo pecl install sqlsrv pdo_sqlsrv
echo "extension=sqlsrv.so" &gt;&gt; /etc/php/7.4/cli/php.ini</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: file_get_contents() saat boot (config/app.php)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: Path PUBLIC_KEY_LPD / MASTER_BANK_LIST tidak valid
// Pastikan file ada dan .env menggunakan path absolut yang benar:
ls -la /path/to/keys/public_key.pem
chmod 644 keys/public_key.pem</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Warning: Deprecated PHP 8.x</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// SOLUSI: Gunakan PHP 7.4 (sangat disarankan, jangan PHP 8.x)
sudo update-alternatives --config php
# Pilih php7.4</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: Composer autoload Helper not found</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: case-sensitive path di Linux
// Path di composer.json: "App/Helpers/..." (huruf A besar)
// Path aktual: "app/Helpers/..." (huruf a kecil)
// Solusi: composer dump-autoload --no-scripts</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error 403: IP tidak dikenal</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahkan IP development ke .env:
GIO_WHITE_LIST=|103.66.86.234|127.0.0.1|YOUR_DEV_IP

// Atau di iosAccessMdw.php check_access():
// Tambahkan kondisi || $noip == "127.0.0.1"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Token selalu expired / invalid</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Token valid 3 menit dari pembuatan (iosHelper::Gio_CheckToken)
// Solusi: 
sudo ntpdate -u pool.ntp.org  // Sinkronkan waktu server
// Pastikan ada record di gmob_token yang masih fresh</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Storage / log permission error</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>sudo chmod -R 775 storage/ bootstrap/cache/
sudo chown -R www-data:www-data storage/
mkdir -p storage/logs/{token,transfer-in/inquiry,transfer-in/posting,access,tabungan,transfer-AR,transfer-AB,ppob}</pre>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><i class="fas fa-file-alt" style="color:#64748b"></i><h3>Lokasi Log Files</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path Log</th><th>Isi</th></tr>
        <tr><td><span class="inline-code">storage/logs/token/request.log</span></td><td>Log request get access token (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/access.txt</span></td><td>Log akses umum iOS (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/tabungan.txt</span></td><td>Log request endpoint tabungan</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AR.txt</span></td><td>Log transfer sesama LPD</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AB.txt</span></td><td>Log transfer antar bank</td></tr>
        <tr><td><span class="inline-code">storage/logs/ppob.txt</span></td><td>Log request PPOB</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/inquiry/</span></td><td>Log SNAP inquiry (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/posting/</span></td><td>Log SNAP payment (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/laravel-YYYY-MM-DD.log</span></td><td>Log Laravel standar</td></tr>
      </table>
    </div>
  </div>
</section>


<!-- TERMINAL -->
<section id="section-terminal" class="section">
  <div class="card" style="max-width:900px">
    <div class="card-header" style="background:#0f172a;border-bottom:1px solid #1e293b">
      <i class="fas fa-terminal" style="color:#22d3ee"></i>
      <h3 style="color:#e2e8f0">Terminal Interaktif</h3>
      <span style="margin-left:auto;font-size:11px;color:#64748b">Sandbox: /home/user</span>
      <button onclick="clearTerminal()" title="Clear" style="margin-left:12px;background:#1e293b;border:none;color:#94a3b8;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px"><i class="fas fa-eraser"></i></button>
    </div>
    <div style="background:#0f172a;padding:0">
      <!-- Output area -->
      <div id="term-output" style="font-family:'Courier New',monospace;font-size:13px;line-height:1.7;padding:16px;min-height:360px;max-height:520px;overflow-y:auto;color:#e2e8f0;background:#0f172a"></div>
      <!-- Input row -->
      <div style="display:flex;align-items:center;border-top:1px solid #1e293b;padding:10px 16px;background:#0a0f1e;gap:8px">
        <span id="term-prompt" style="color:#22d3ee;font-family:monospace;font-size:13px;white-space:nowrap;flex-shrink:0">user@sandbox:~$</span>
        <input id="term-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          style="flex:1;background:transparent;border:none;outline:none;color:#f1f5f9;font-family:'Courier New',monospace;font-size:13px;caret-color:#22d3ee"
          placeholder="ketik perintah..."
          onkeydown="termKeyDown(event)"/>
        <button onclick="termRun()" style="background:#1d4ed8;border:none;color:#fff;padding:5px 14px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Run <i class="fas fa-play" style="font-size:10px"></i></button>
      </div>
    </div>
  </div>

  <div class="card" style="max-width:900px;margin-top:16px">
    <div class="card-header"><i class="fas fa-bolt" style="color:#f59e0b"></i><h3>Perintah Cepat</h3></div>
    <div class="card-body" style="display:flex;flex-wrap:wrap;gap:10px">
      <button class="quick-cmd" onclick="quickCmd('php7.4 --version')">php --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak')">ls lpd_seminyak/</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/.env | grep -v PASSWORD | grep -v SECRET | grep -v KEY | head -30')">cat .env (safe)</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan env')">artisan env</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan route:list 2>&1 | head -40')">artisan route:list</button>
      <button class="quick-cmd" onclick="quickCmd('composer --version')">composer --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Http/Controllers/')">ls Controllers/</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Helpers/')">ls Helpers/</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 -m | grep -E \"pdo|sqlsrv|mbstring|openssl\"')">php modules</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/routes/api.php | head -60')">routes/api.php</button>
      <button class="quick-cmd" onclick="quickCmd('du -sh /home/user/webapp/lpd_seminyak/*')">disk usage</button>
      <button class="quick-cmd" onclick="quickCmd('uname -a && cat /etc/os-release | head -5')">system info</button>
    </div>
  </div>

  <div class="info-box info-yellow" style="max-width:900px">
    <i class="fas fa-exclamation-triangle"></i>
    <div><strong>Catatan:</strong> Terminal berjalan di sandbox server. Perintah berbahaya (rm -rf /, fork bomb, dll) diblokir. Timeout 15 detik per perintah.</div>
  </div>
</section>

</div>
</main>

<button class="toggle-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>

<style>
.quick-cmd{background:#f1f5f9;border:1px solid #e2e8f0;color:#1e40af;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;font-family:'Courier New',monospace}
.quick-cmd:hover{background:#dbeafe;border-color:#93c5fd}
.term-line-out{color:#e2e8f0}
.term-line-err{color:#fca5a5}
.term-line-cmd{color:#22d3ee;font-weight:700}
.term-line-info{color:#86efac}
.term-line-cwd{color:#94a3b8;font-size:11px}
</style>

<script>
var termHistory = [];
var termHistIdx = -1;
var termCwd = '/home/user';

function termKeyDown(e) {
  if (e.key === 'Enter') { e.preventDefault(); termRun(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (termHistIdx < termHistory.length-1) { termHistIdx++; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (termHistIdx > 0) { termHistIdx--; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } else { termHistIdx=-1; document.getElementById('term-input').value=''; } }
}

function termRun() {
  var input = document.getElementById('term-input');
  var cmd = input.value.trim();
  if (!cmd) return;
  input.value = '';
  termHistIdx = -1;
  termHistory.unshift(cmd);
  if (termHistory.length > 100) termHistory.pop();
  appendTermLine('$ ' + cmd, 'term-line-cmd');
  setTermBusy(true);
  fetch('/api/exec', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ command: cmd, workdir: termCwd })
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var NL = String.fromCharCode(10);
    if (d.stdout && d.stdout.trim()) d.stdout.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-out'); });
    if (d.stderr && d.stderr.trim()) d.stderr.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-err'); });
    if (d.cwd && d.cwd !== termCwd) {
      termCwd = d.cwd;
      updatePrompt();
    }
    if (!d.stdout && !d.stderr && d.exitCode === 0) appendTermLine('(perintah selesai, tidak ada output)','term-line-info');
    setTermBusy(false);
    scrollTermBottom();
  })
  .catch(function(err){
    appendTermLine('Error: ' + err.message, 'term-line-err');
    setTermBusy(false);
    scrollTermBottom();
  });
}

function quickCmd(cmd) {
  showSection('terminal');
  document.getElementById('term-input').value = cmd;
  document.getElementById('term-input').focus();
  setTimeout(termRun, 100);
}

function appendTermLine(text, cls) {
  var out = document.getElementById('term-output');
  var line = document.createElement('div');
  line.className = cls || 'term-line-out';
  line.textContent = text;
  out.appendChild(line);
}

function scrollTermBottom() {
  var out = document.getElementById('term-output');
  out.scrollTop = out.scrollHeight;
}

function clearTerminal() {
  document.getElementById('term-output').innerHTML = '';
  appendTermLine('Terminal dibersihkan. Ketik perintah di bawah.', 'term-line-info');
}

function setTermBusy(busy) {
  var btn = document.querySelector('#section-terminal button[onclick="termRun()"]');
  var inp = document.getElementById('term-input');
  if (btn) btn.disabled = busy;
  if (inp) inp.disabled = busy;
  if (busy) appendTermLine('⏳ menjalankan...', 'term-line-info');
}

function updatePrompt() {
  var short = termCwd.replace('/home/user', '~');
  document.getElementById('term-prompt').textContent = 'user@sandbox:' + short + '$';
}

// Inisialisasi terminal
(function initTerminal() {
  fetch('/api/exec/health').then(function(r){return r.json();}).then(function(d){
    if (d.ok) {
      termCwd = d.cwd || '/home/user';
      updatePrompt();
      appendTermLine('✅ Terminal siap. Server berjalan di sandbox.', 'term-line-info');
      appendTermLine('💡 Ketik perintah Linux atau klik tombol Perintah Cepat di bawah.', 'term-line-info');
    } else {
      appendTermLine('⚠️  Terminal server offline. Coba muat ulang halaman.', 'term-line-err');
    }
  }).catch(function(){
    appendTermLine('⚠️  Tidak dapat terhubung ke terminal server.', 'term-line-err');
  });
})();
</script>

<script>
function showSection(name) {
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.querySelectorAll('#sidebar nav a').forEach(function(a){a.classList.remove('active')});
  var sec = document.getElementById('section-' + name);
  if (sec) sec.classList.add('active');
  var nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  var titles = {
    'overview': 'Beranda & Ringkasan',
    'architecture': 'Arsitektur Sistem',
    'install': 'Panduan Instalasi',
    'config': 'Konfigurasi .env',
    'auth': 'Autentikasi & Token',
    'ios-access': 'iOS – Login & Register',
    'ios-tabungan': 'iOS – Tabungan',
    'ios-transfer-lpd': 'iOS – Transfer LPD',
    'ios-transfer-bank': 'iOS – Transfer Antar Bank',
    'ios-ppob': 'iOS – PPOB',
    'snap': 'SNAP – Transfer VA BPD',
    'atm': 'ATM Cardless',
    'ppob-callback': 'PPOB Callback',
    'database': 'Skema Database',
    'response-codes': 'Kode Respons',
    'security': 'Keamanan & Enkripsi',
    'middleware': 'Middleware & Guard',
    'helpers': 'Helper Classes',
    'troubleshoot': 'Troubleshooting',
    'terminal': 'Terminal Interaktif'
  };
  document.getElementById('page-title').innerHTML = '<i class="fas fa-book mr-2" style="color:#2563eb"></i>' + (titles[name] || name);
  window.scrollTo(0,0);
}
function toggleEndpoint(header) {
  var body = header.nextElementSibling;
  body.classList.toggle('hidden');
  var icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  if (icon) { icon.classList.toggle('fa-chevron-down'); icon.classList.toggle('fa-chevron-up'); }
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
</script>
</body>
</html>`
}

export default app
