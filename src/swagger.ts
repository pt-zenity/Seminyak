// ============================================================
//  LPD Seminyak – Swagger-like API Explorer
//  File terpisah agar tidak membebani index.tsx
// ============================================================

export function getSwaggerHTML(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak – API Explorer</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{
  --bg:#fafafa;--sidebar:#1a1f2e;--primary:#1d4ed8;--primary-dark:#1e40af;
  --green:#16a34a;--yellow:#d97706;--red:#dc2626;--purple:#7c3aed;--cyan:#0891b2;
  --border:#e5e7eb;--text:#111827;--muted:#6b7280;--code-bg:#0f172a;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:14px}

/* TOP NAV */
#topnav{position:sticky;top:0;z-index:200;background:var(--sidebar);color:#fff;
  display:flex;align-items:center;padding:0 20px;height:52px;gap:16px;box-shadow:0 2px 8px rgba(0,0,0,.4)}
#topnav .logo{font-weight:800;font-size:16px;color:#fff;display:flex;align-items:center;gap:8px}
#topnav .logo span{color:#60a5fa}
#topnav .tagline{font-size:11px;color:#94a3b8;border-left:1px solid #334155;padding-left:16px}
#topnav .nav-links{margin-left:auto;display:flex;gap:4px}
#topnav .nav-links a{color:#94a3b8;text-decoration:none;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;transition:.15s}
#topnav .nav-links a:hover{background:rgba(255,255,255,.1);color:#fff}
#base-url-bar{background:#1e293b;border-bottom:1px solid #334155;padding:8px 20px;display:flex;align-items:center;gap:10px;font-size:12px}
#base-url-bar label{color:#94a3b8;font-weight:600;white-space:nowrap}
#base-url-input{flex:1;max-width:480px;background:#0f172a;border:1px solid #334155;color:#e2e8f0;
  padding:6px 12px;border-radius:6px;font-family:monospace;font-size:12px;outline:none}
#base-url-input:focus{border-color:#3b82f6}
.url-badge{background:#065f46;color:#d1fae5;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px}

/* TOKEN TOOLBAR */
#token-toolbar{background:#0f172a;border-bottom:2px solid #1e293b;padding:8px 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px}
#token-toolbar .tt-label{color:#64748b;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.6px;white-space:nowrap}
.token-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:700;font-family:monospace;background:#1e293b;color:#64748b;border:1px solid #334155;min-width:180px;transition:.2s}
.auto-token-btn{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:.15s}
.auto-token-btn.snap-btn{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff}
.auto-token-btn.snap-btn:hover{background:linear-gradient(135deg,#8b5cf6,#6d28d9);transform:translateY(-1px)}
.auto-token-btn.ios-btn{background:linear-gradient(135deg,#059669,#065f46);color:#fff}
.auto-token-btn.ios-btn:hover{background:linear-gradient(135deg,#10b981,#047857);transform:translateY(-1px)}
.auto-token-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.xfwd-toggle{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:11px;cursor:pointer;user-select:none;transition:.15s;white-space:nowrap}
.xfwd-toggle:hover{border-color:#f59e0b;color:#fbbf24}
.xfwd-toggle input[type=checkbox]{accent-color:#f59e0b;width:13px;height:13px;cursor:pointer}
.xfwd-toggle.active{border-color:#f59e0b;background:rgba(245,158,11,.08);color:#fbbf24}
.tt-sep{width:1px;height:24px;background:#1e293b;flex-shrink:0}

/* LAYOUT */
#layout{display:flex;min-height:calc(100vh - 128px)}
#sidebar{width:260px;flex-shrink:0;background:#fff;border-right:1px solid var(--border);
  position:sticky;top:128px;height:calc(100vh - 128px);overflow-y:auto}
#main-content{flex:1;padding:24px;max-width:960px}

/* SIDEBAR */
.sb-section{padding:10px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;
  letter-spacing:1px;color:var(--muted)}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 16px;cursor:pointer;
  font-size:12px;color:var(--muted);transition:.15s;border-left:3px solid transparent;
  text-decoration:none}
.sb-item:hover{background:#f3f4f6;color:var(--text)}
.sb-item.active{background:#eff6ff;color:var(--primary);border-left-color:var(--primary);font-weight:600}
.method-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.dot-post{background:var(--yellow)}.dot-get{background:var(--green)}

/* TAG GROUP */
.tag-group{margin-bottom:32px}
.tag-header{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:2px solid var(--border);margin-bottom:16px;cursor:pointer}
.tag-header h2{font-size:18px;font-weight:800;color:var(--text)}
.tag-desc{font-size:13px;color:var(--muted);margin-top:2px}
.tag-count{background:#f3f4f6;color:var(--muted);font-size:11px;font-weight:700;
  padding:2px 8px;border-radius:999px;margin-left:auto}

/* ENDPOINT CARD */
.ep-card{border:1px solid var(--border);border-radius:10px;margin-bottom:12px;
  overflow:hidden;transition:box-shadow .2s}
.ep-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.08)}
.ep-card.open{border-color:#93c5fd;box-shadow:0 0 0 1px #93c5fd}
.ep-header{display:flex;align-items:center;gap:12px;padding:14px 16px;
  cursor:pointer;background:#fff;user-select:none;transition:background .15s}
.ep-header:hover{background:#f8fafc}
.method-badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:5px;
  min-width:56px;text-align:center;letter-spacing:.5px}
.mb-post{background:#fef3c7;color:#92400e}
.mb-get{background:#d1fae5;color:#065f46}
.ep-path{font-family:'Courier New',monospace;font-size:13px;font-weight:600;color:var(--primary)}
.ep-summary{font-size:12px;color:var(--muted);margin-left:4px}
.ep-chevron{margin-left:auto;color:var(--muted);transition:transform .2s;font-size:12px}
.ep-card.open .ep-chevron{transform:rotate(180deg)}
.ep-body{display:none;border-top:1px solid var(--border);background:#fff}
.ep-card.open .ep-body{display:block}

/* EP BODY TABS */
.ep-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 16px}
.ep-tab{padding:10px 16px;font-size:12px;font-weight:600;cursor:pointer;
  color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:.15s}
.ep-tab.active{color:var(--primary);border-bottom-color:var(--primary)}
.ep-pane{display:none;padding:16px}
.ep-pane.active{display:block}

/* PARAMETERS TABLE */
.param-table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px}
.param-table th{background:#f8fafc;padding:8px 12px;text-align:left;font-weight:700;
  color:#374151;border-bottom:2px solid var(--border);font-size:11px;text-transform:uppercase;letter-spacing:.5px}
.param-table td{padding:8px 12px;border-bottom:1px solid #f3f4f6;vertical-align:top}
.param-table tr:last-child td{border-bottom:none}
.param-name{font-family:monospace;font-weight:700;color:#1e40af}
.param-type{font-size:10px;color:#7c3aed;background:#f3e8ff;padding:1px 6px;border-radius:3px;font-weight:600}
.param-in{font-size:10px;color:var(--muted);background:#f3f4f6;padding:1px 6px;border-radius:3px}
.param-req{font-size:10px;color:#dc2626;background:#fee2e2;padding:1px 6px;border-radius:3px;font-weight:700}
.param-opt{font-size:10px;color:#6b7280;background:#f3f4f6;padding:1px 6px;border-radius:3px}

/* TRY IT OUT */
.try-panel{background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0}
.try-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px}
.try-row{margin-bottom:12px}
.try-input{width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;
  font-family:monospace;font-size:12px;background:#fff;outline:none;transition:.15s}
.try-input:focus{border-color:var(--primary);box-shadow:0 0 0 2px #dbeafe}
.try-textarea{min-height:100px;resize:vertical}
.try-btn{background:var(--primary);color:#fff;border:none;padding:9px 20px;
  border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:.15s;
  display:flex;align-items:center;gap:6px}
.try-btn:hover{background:var(--primary-dark)}
.try-btn:disabled{opacity:.5;cursor:not-allowed}
.try-btn.loading .fa-play{display:none}
.try-clear{background:#f3f4f6;color:var(--muted);border:1px solid #d1d5db;
  padding:9px 16px;border-radius:6px;font-size:12px;cursor:pointer;transition:.15s;margin-left:8px}
.try-clear:hover{background:#e5e7eb}
.response-box{margin-top:14px;border-radius:8px;overflow:hidden;border:1px solid var(--border)}
.response-status{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#1e293b;font-size:12px}
.status-code{font-family:monospace;font-weight:700;font-size:14px}
.status-2xx{color:#4ade80}.status-4xx{color:#fbbf24}.status-5xx{color:#f87171}
.response-time{color:#64748b;font-size:11px;margin-left:auto}
.response-body{background:var(--code-bg);color:#e2e8f0;padding:14px;
  font-family:'Courier New',monospace;font-size:12px;line-height:1.7;
  overflow-x:auto;max-height:420px;overflow-y:auto;white-space:pre;word-break:break-all}

/* CODE BLOCK */
pre.code-block{background:var(--code-bg);color:#e2e8f0;padding:14px 16px;border-radius:8px;
  font-size:12px;line-height:1.7;overflow-x:auto;margin:8px 0;white-space:pre}
.hl-key{color:#7dd3fc}.hl-str{color:#86efac}.hl-num{color:#fda4af}.hl-bool{color:#c4b5fd}

/* MIDDLEWARE BADGES */
.mw-badge{display:inline-flex;align-items:center;gap:4px;background:#1e293b;
  color:#94a3b8;font-size:10px;padding:3px 8px;border-radius:4px;margin:2px;font-family:monospace}
.mw-badge i{font-size:9px}

/* INFO BOX */
.info-box{padding:10px 14px;border-radius:6px;font-size:12px;margin:8px 0;display:flex;gap:8px}
.ib-blue{background:#eff6ff;border-left:3px solid #3b82f6;color:#1e40af}
.ib-yellow{background:#fffbeb;border-left:3px solid #f59e0b;color:#92400e}
.ib-red{background:#fef2f2;border-left:3px solid #ef4444;color:#991b1b}
.ib-green{background:#f0fdf4;border-left:3px solid #22c55e;color:#15803d}

/* SCHEMA */
.schema-obj{background:#0f172a;border-radius:8px;padding:14px;font-family:monospace;
  font-size:12px;line-height:1.8;color:#e2e8f0;margin:8px 0;overflow-x:auto}

/* RESPONSIVE */
@media(max-width:768px){
  #sidebar{display:none}
  #main-content{padding:12px}
  #layout{flex-direction:column}
}

/* JSON SYNTAX HIGHLIGHT */
.jk{color:#7dd3fc}.js{color:#86efac}.jn{color:#fda4af}.jb{color:#c4b5fd}.jnull{color:#94a3b8}

/* Spinner */
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* Token detail panel slide-in */
#token-detail-panel{transition:transform .25s ease,opacity .25s ease}
#token-detail-panel::-webkit-scrollbar{width:4px}
#token-detail-panel::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}

/* SNAP client key input */
#snap-client-key{transition:border-color .15s}
#snap-client-key:focus{border-color:#7c3aed !important;box-shadow:0 0 0 2px rgba(124,58,237,.2)}
</style>
</head>
<body>

<!-- TOP NAV -->
<nav id="topnav">
  <div class="logo"><i class="fas fa-university" style="color:#60a5fa"></i><span>LPD</span> Seminyak <span style="font-weight:300;color:#94a3b8">API Explorer</span></div>
  <div class="tagline">Laravel 5.5 · PHP 7.4 · SQL Server</div>
  <div class="nav-links">
    <a href="/docs"><i class="fas fa-book mr-1"></i>Docs</a>
    <a href="/swagger" style="color:#60a5fa;background:rgba(96,165,250,.1)"><i class="fas fa-flask mr-1"></i>Explorer</a>
  </div>
</nav>

<!-- BASE URL BAR -->
<div id="base-url-bar">
  <label><i class="fas fa-server" style="margin-right:4px"></i>Base URL:</label>
  <input id="base-url-input" type="text" value="https://lpdseminyak.biz.id:8000" placeholder="https://your-api-host.com"/>
  <span class="url-badge">LIVE</span>
  <div style="width:1px;height:24px;background:#334155;flex-shrink:0;margin:0 6px"></div>
  <label style="color:#94a3b8;font-size:11px;font-weight:600;white-space:nowrap"><i class="fas fa-id-card" style="margin-right:4px;color:#7c3aed"></i>X-CLIENT-KEY:</label>
  <input id="snap-client-key" type="text" value="LPD-SEMINYAK-001"
    style="background:#0f172a;border:1px solid #334155;color:#c4b5fd;padding:5px 10px;border-radius:5px;font-family:monospace;font-size:11px;width:160px;outline:none"
    placeholder="LPD-SEMINYAK-001"
    title="X-CLIENT-KEY untuk SNAP B2B Token (partner ID yang terdaftar di BPD)"/>
  <span style="color:#64748b;font-size:10px;margin-left:4px">SNAP</span>
</div>

<!-- TOKEN TOOLBAR -->
<div id="token-toolbar">
  <span class="tt-label"><i class="fas fa-key" style="margin-right:4px;color:#f59e0b"></i>Auth Tokens</span>
  <div class="tt-sep"></div>

  <!-- SNAP Token -->
  <button id="btn-snap-token" class="auto-token-btn snap-btn" onclick="autoToken('snap')">
    <i class="fas fa-bolt"></i> Auto Token SNAP
  </button>
  <span id="snap-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>SNAP – Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- iOS Token -->
  <button id="btn-ios-token" class="auto-token-btn ios-btn" onclick="autoToken('ios')">
    <i class="fas fa-mobile-alt"></i> Auto Token iOS
  </button>
  <span id="ios-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>iOS – Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- X-Forwarded-For Toggle -->
  <label class="xfwd-toggle active" id="xfwd-label" onclick="toggleXFwd(this)">
    <input type="checkbox" id="chk-xforward" checked onchange="updateXFwdStyle()"/>
    <i class="fas fa-shield-alt" style="color:#f59e0b"></i>
    X-Forwarded-For: <code style="color:#fbbf24;margin-left:2px">34.50.74.78</code>
  </label>

  <span style="color:#334155;font-size:10px;margin-left:4px">· IP whitelist otomatis diinjeksi ke setiap request</span>
</div>

<div id="layout">

<!-- SIDEBAR -->
<aside id="sidebar">
  <div class="sb-section">SNAP · BPD</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>SNAP Token B2B</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Payment</a>
  <div class="sb-section">Mobile Banking</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Register</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Login</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Logout</a>
  <div class="sb-section">Tabungan</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Account List</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Transaction History</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Mutasi History</a>
  <div class="sb-section">Transfer</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Posting</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Posting</a>
  <div class="sb-section">PPOB · IAK</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Request</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Request</a>
  <div class="sb-section">ATM Cardless</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Create Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Check Balance</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Credit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Credit</a>
  <div class="sb-section">Callback</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob-cb');return false"><span class="method-dot dot-post"></span>PPOB Callback</a>
</aside>

<!-- MAIN CONTENT -->
<main id="main-content">

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: SNAP -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-snap">
  <div class="tag-header" onclick="toggleGroup('grp-snap')">
    <i class="fas fa-plug" style="color:#7c3aed;font-size:18px"></i>
    <div>
      <h2>SNAP – Transfer VA BPD</h2>
      <div class="tag-desc">Standar Nasional Open API Pembayaran – Virtual Account Transfer-In (Bank BPD Bali)</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    <!-- SNAP Token -->
    ${epCard('snap-token','POST','/api/v1.0/access-token/b2b','Get Access Token B2B',
      [
        {name:'grantType',in:'body',type:'string',req:true,desc:'Harus bernilai <code>client_credentials</code>'},
        {name:'X-TIMESTAMP',in:'header',type:'string',req:true,desc:'ISO 8601 datetime: <code>2024-01-15T10:30:00+07:00</code>'},
        {name:'X-CLIENT-KEY',in:'header',type:'string',req:true,desc:'Partner ID / Client Key dari konfigurasi SNAP'},
        {name:'X-SIGNATURE',in:'header',type:'string',req:true,desc:'Tanda tangan RSA SHA-256 dengan private key LPD'},
      ],
      '{"responseCode":"2007300","responseMessage":"Successful","accessToken":"eyJ0eXAiOiJKV1QiLC...","tokenType":"BearerToken","expiresIn":"900"}',
      `{
  "grantType": "client_credentials"
}`,
      ['snapTransferIn middleware','RSA SHA-256 signature','JWT token (exp: 15 menit)'],
      'Token digunakan untuk semua request SNAP selanjutnya. Expire dalam 15 menit.'
    )}

    <!-- SNAP Inquiry -->
    ${epCard('snap-inquiry','POST','/api/v1.0/transfer-va/inquiry','Virtual Account Inquiry',
      [
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {accessToken} dari endpoint access-token/b2b'},
        {name:'X-TIMESTAMP',in:'header',type:'string',req:true,desc:'ISO 8601 datetime'},
        {name:'X-SIGNATURE',in:'header',type:'string',req:true,desc:'HMAC-SHA512 signature'},
        {name:'X-PARTNER-ID',in:'header',type:'string',req:true,desc:'Partner ID (BPD Bali)'},
        {name:'X-EXTERNAL-ID',in:'header',type:'string',req:true,desc:'Unique ID request (max 36 char)'},
        {name:'CHANNEL-ID',in:'header',type:'string',req:true,desc:'Channel ID sistem'},
        {name:'partnerServiceId',in:'body',type:'string',req:true,desc:'Kode bank prefix (8 digit, left-padded dengan spasi)'},
        {name:'customerNo',in:'body',type:'string',req:true,desc:'Nomor nasabah (max 20 char)'},
        {name:'virtualAccountNo',in:'body',type:'string',req:true,desc:'Nomor Virtual Account lengkap'},
        {name:'inquiryRequestId',in:'body',type:'string',req:true,desc:'Reference ID unik dari bank pengirim'},
        {name:'amount',in:'body',type:'object',req:false,desc:'Object {value: "100000.00", currency: "IDR"}'},
        {name:'additionalInfo',in:'body',type:'object',req:true,desc:'{terminalType, terminalId}'},
      ],
      '{"responseCode":"2002400","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","inquiryRequestId":"INQ-001","virtualAccountName":"I MADE BUDI"}}',
      `{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "inquiryRequestId": "INQ-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`,
      ['snapTransferIn middleware','HMAC-SHA512 signature check','IP whitelist BPD (8 IP)','Token validation'],
      'Middleware memvalidasi: IP sumber, HMAC signature, token JWT, dan field mandatory.'
    )}

    <!-- SNAP Payment -->
    ${epCard('snap-payment','POST','/api/v1.0/transfer-va/payment','Virtual Account Payment',
      [
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {accessToken}'},
        {name:'X-TIMESTAMP',in:'header',type:'string',req:true,desc:'ISO 8601 datetime'},
        {name:'X-SIGNATURE',in:'header',type:'string',req:true,desc:'HMAC-SHA512 signature'},
        {name:'X-PARTNER-ID',in:'header',type:'string',req:true,desc:'Partner ID'},
        {name:'X-EXTERNAL-ID',in:'header',type:'string',req:true,desc:'Unique request ID'},
        {name:'partnerServiceId',in:'body',type:'string',req:true,desc:'Kode bank prefix'},
        {name:'customerNo',in:'body',type:'string',req:true,desc:'Nomor nasabah'},
        {name:'virtualAccountNo',in:'body',type:'string',req:true,desc:'Nomor Virtual Account'},
        {name:'virtualAccountName',in:'body',type:'string',req:true,desc:'Nama nasabah'},
        {name:'paymentRequestId',in:'body',type:'string',req:true,desc:'Reference ID unik pembayaran'},
        {name:'amount',in:'body',type:'object',req:true,desc:'{value: "100000.00", currency: "IDR"}'},
        {name:'trxDateTime',in:'body',type:'string',req:true,desc:'Waktu transaksi ISO 8601'},
        {name:'additionalInfo',in:'body',type:'object',req:false,desc:'{terminalType, terminalId}'},
      ],
      '{"responseCode":"2002500","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","paymentRequestId":"PAY-001","paidAmount":{"value":"100000.00","currency":"IDR"},"trxDateTime":"2024-01-15T10:35:00+07:00"}}',
      `{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "virtualAccountName": "I MADE BUDI",
  "paymentRequestId": "PAY-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "trxDateTime": "2024-01-15T10:35:00+07:00",
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`,
      ['snapTransferIn middleware','Duplicate check (inquiryRequestId)','DB insert: gtb_folio, gak_mutasi, gcore_transfer'],
      'Melakukan posting ke database: folio tabungan, mutasi kredit, dan core transfer.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: AUTH -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-auth">
  <div class="tag-header" onclick="toggleGroup('grp-auth')">
    <i class="fas fa-key" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>Mobile Banking – Autentikasi</h2>
      <div class="tag-desc">Token, registrasi, login, logout, dan update credentials</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('ios-token','POST','/api/smart/access/token','Get Access Token iOS',
      [
        {name:'user_id',in:'query',type:'string',req:true,desc:'Customer ID / IMEI (dienkripsi AES-256)'},
        {name:'device_id',in:'query',type:'string',req:true,desc:'Device identifier'},
        {name:'X-Access-Key',in:'header',type:'string',req:true,desc:'Access key dari konfigurasi'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","token":"eyJ0eXAiOiJKV1Qi...","expired":"2024-01-15 11:30:00"}',
      '',
      ['iosCheckAccess middleware','IP whitelist check','Partner validation','Access logging'],
      'Token berlaku selama sesi aktif. Gunakan sebagai Authorization header di endpoint lain.'
    )}

    ${epCard('ios-register','POST','/api/smart/access/register','Register Nasabah',
      [
        {name:'user_name',in:'query',type:'string',req:true,desc:'Username nasabah (dienkripsi)'},
        {name:'user_pass',in:'query',type:'string',req:true,desc:'Password (dienkripsi AES-256)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token} dari /access/token'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","pin":"ENC_PIN...","account_list":[{"norek":"1.123456","type":"tabungan"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Jika nasabah pertama kali (status=SY), akan di-upgrade ke status A dan dikembalikan data lengkap.'
    )}

    ${epCard('ios-login','POST','/api/smart/access/login','Login Nasabah',
      [
        {name:'user_name',in:'query',type:'string',req:true,desc:'Username (dienkripsi AES-256)'},
        {name:'user_pass',in:'query',type:'string',req:true,desc:'Password (dienkripsi AES-256)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","account_list":[{"norek":"1.123456","type":"tabungan","saldo":"ENC_SALDO"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Mengembalikan daftar rekening dan saldo (terenkripsi), daftar bank, dan produk PPOB aktif.'
    )}

    ${epCard('ios-logout','POST','/api/smart/access/logout','Logout Nasabah',
      [
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Menutup token di gmob_token (set status=closed, end_time=now).'
    )}

    ${epCard('ios-update-pass','POST','/api/smart/access/update/pass','Update Password',
      [
        {name:'old_pass',in:'query',type:'string',req:true,desc:'Password lama (dienkripsi AES-256)'},
        {name:'new_pass',in:'query',type:'string',req:true,desc:'Password baru (dienkripsi AES-256)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Password berhasil diubah"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Verifikasi password lama sebelum update ke gmob_nasabah.pass_crypto.'
    )}

    ${epCard('ios-update-pin','POST','/api/smart/access/update/pin','Update PIN',
      [
        {name:'old_pin',in:'query',type:'string',req:true,desc:'PIN lama (dienkripsi AES-256)'},
        {name:'new_pin',in:'query',type:'string',req:true,desc:'PIN baru (dienkripsi AES-256)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"PIN berhasil diubah"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Verifikasi PIN lama sebelum update ke gmob_nasabah.pin_crypto.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: TABUNGAN -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-tabungan">
  <div class="tag-header" onclick="toggleGroup('grp-tabungan')">
    <i class="fas fa-piggy-bank" style="color:#16a34a;font-size:18px"></i>
    <div>
      <h2>Tabungan</h2>
      <div class="tag-desc">Daftar rekening, histori transaksi, dan mutasi tabungan</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('tab-list','POST','/api/smart/tabungan/account-list','Daftar Rekening Nasabah',
      [
        {name:'customer_id',in:'query',type:'string',req:true,desc:'Customer ID terenkripsi'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","data":[{"norek":"ENC...","type":"tabungan","saldo":"ENC...","currency":"IDR"},{"norek":"ENC...","type":"pinjaman","saldo":"ENC..."}]}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Mengembalikan semua rekening (tabungan, pinjaman, deposito) dengan saldo terenkripsi.'
    )}

    ${epCard('tab-history','POST','/api/smart/tabungan/transaction-history','Histori Transaksi',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening (dienkripsi)'},
        {name:'start_date',in:'query',type:'string',req:false,desc:'Tanggal mulai YYYY-MM-DD'},
        {name:'end_date',in:'query',type:'string',req:false,desc:'Tanggal akhir YYYY-MM-DD'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","data":[{"tanggal":"2024-01-15","keterangan":"Transfer Masuk","debet":0,"kredit":100000,"saldo":1500000}]}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Query dari gtb_folio, hasil dienkripsi. Default 30 hari terakhir jika tanggal tidak disertakan.'
    )}

    ${epCard('tab-mutasi','POST','/api/smart/tabungan/mutasi-history','Histori Mutasi',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening (dienkripsi)'},
        {name:'period',in:'query',type:'string',req:false,desc:'Periode: YYYYMM (default: bulan ini)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","saldo_awal":"ENC...","saldo_akhir":"ENC...","data":[{"tgl":"2024-01-15","ket":"PPOB-PLN","nominal":"ENC...","jenis":"D"}]}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Mutasi per periode (bulanan). Semua nilai nominal dienkripsi AES-256-CBC.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: TRANSFER -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-transfer">
  <div class="tag-header" onclick="toggleGroup('grp-transfer')">
    <i class="fas fa-exchange-alt" style="color:#0891b2;font-size:18px"></i>
    <div>
      <h2>Transfer</h2>
      <div class="tag-desc">Transfer sesama LPD dan transfer ke bank lain (via BPD)</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('tr-lpd-check','POST','/api/smart/transfer/lpd/check','LPD – Cek Rekening Tujuan',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening tujuan (dienkripsi AES-256)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses inquiry","product_type":"tabungan","customer_name":"I WAYAN SARI"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Verifikasi rekening tujuan sesama LPD. Error 01 = rekening tidak aktif.'
    )}

    ${epCard('tr-lpd-inquiry','POST','/api/smart/transfer/lpd/inquiry','LPD – Inquiry Transfer',
      [
        {name:'from_acc',in:'query',type:'string',req:true,desc:'Rekening sumber (dienkripsi)'},
        {name:'to_acc',in:'query',type:'string',req:true,desc:'Rekening tujuan (dienkripsi)'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal (dienkripsi)'},
        {name:'from_name',in:'query',type:'string',req:true,desc:'Nama pengirim (dienkripsi)'},
        {name:'to_name',in:'query',type:'string',req:true,desc:'Nama penerima (dienkripsi)'},
        {name:'remark',in:'query',type:'string',req:true,desc:'Keterangan + hashCode (dienkripsi, format: ket<>hash)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"81","message":"Sukses Inquiry"}',
      '',
      ['iosCheckAccess','iosTokenMdw','SHA-256 hash check','Saldo & limit check'],
      'Verifikasi: hash SHA-256, saldo cukup (min SALDO_MIN=50.000), limit transfer (10K–1M). Status 81 = bisa dilanjutkan.'
    )}

    ${epCard('tr-lpd-post','POST','/api/smart/transfer/lpd/post','LPD – Posting Transfer',
      [
        {name:'trans_no',in:'query',type:'string',req:true,desc:'Nomor transaksi unik (dienkripsi)'},
        {name:'from_acc',in:'query',type:'string',req:true,desc:'Rekening sumber (dienkripsi)'},
        {name:'to_acc',in:'query',type:'string',req:true,desc:'Rekening tujuan (dienkripsi)'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal (dienkripsi)'},
        {name:'pin',in:'query',type:'string',req:true,desc:'PIN nasabah (dienkripsi)'},
        {name:'remark',in:'query',type:'string',req:true,desc:'Keterangan (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Transfer Berhasil","reference_no":"20240115120001"}',
      '',
      ['iosCheckAccess','iosTokenMdw','PIN validation','Duplicate check (trans_no)','DB: gtb_folio + gak_mutasi'],
      'Error 40=saldo kurang, 45=duplikat transaksi, 51-53=hash mismatch, 54=PIN salah. Posting ke gtb_folio dan gak_mutasi.'
    )}

    ${epCard('tr-bank-check','POST','/api/smart/transfer/bank/check','Bank – Cek Rekening Tujuan',
      [
        {name:'bank_code',in:'query',type:'string',req:true,desc:'Kode bank tujuan (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening tujuan di bank (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","customer_name":"I KETUT DANA","bank_name":"BNI"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Melakukan cURL ke BPD API untuk validasi rekening tujuan di bank lain.'
    )}

    ${epCard('tr-bank-inquiry','POST','/api/smart/transfer/bank/inquiry','Bank – Inquiry Transfer',
      [
        {name:'bank_code',in:'query',type:'string',req:true,desc:'Kode bank tujuan (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening tujuan (dienkripsi)'},
        {name:'from_acc',in:'query',type:'string',req:true,desc:'Rekening sumber (dienkripsi)'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal transfer (dienkripsi)'},
        {name:'remark',in:'query',type:'string',req:true,desc:'Keterangan + hash (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"81","message":"Sukses Inquiry","fee":"3500","total":"103500"}',
      '',
      ['iosCheckAccess','iosTokenMdw','HMAC-SHA256 check','BPD cURL call'],
      'Menghitung biaya transfer dari gcore_bankcode. Status 81 = dapat dilanjutkan ke posting.'
    )}

    ${epCard('tr-bank-post','POST','/api/smart/transfer/bank/post','Bank – Posting Transfer',
      [
        {name:'bank_code',in:'query',type:'string',req:true,desc:'Kode bank (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening tujuan (dienkripsi)'},
        {name:'from_acc',in:'query',type:'string',req:true,desc:'Rekening sumber (dienkripsi)'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal (dienkripsi)'},
        {name:'pin',in:'query',type:'string',req:true,desc:'PIN nasabah (dienkripsi)'},
        {name:'trans_no',in:'query',type:'string',req:true,desc:'Nomor transaksi (dienkripsi)'},
        {name:'remark',in:'query',type:'string',req:true,desc:'Keterangan (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Transfer Berhasil","reference_no":"BPD20240115001"}',
      '',
      ['iosCheckAccess','iosTokenMdw','PIN check','BPD API call via cURL','DB: gcore_transfer'],
      'Mengirim ke BPD API, jika sukses insert ke gcore_transfer. Jika gagal, lakukan rollback gtb_folio.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: PPOB -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-ppob">
  <div class="tag-header" onclick="toggleGroup('grp-ppob')">
    <i class="fas fa-bolt" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>PPOB &amp; IAK</h2>
      <div class="tag-desc">Pembayaran tagihan PLN, PDAM, BPJS, Pulsa (via FastPay &amp; IAK)</div>
    </div>
    <span class="tag-count">4 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('ppob-check','POST','/api/smart/ppob/check','PPOB – Cek Tagihan',
      [
        {name:'product_code',in:'query',type:'string',req:true,desc:'Kode produk PPOB (dienkripsi). Contoh: PLN-POSTPAID'},
        {name:'customer_id',in:'query',type:'string',req:true,desc:'ID Pelanggan / nomor meter (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening pembayaran (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","customer_name":"I MADE SUKERTA","tagihan":"150000","period":"202401","denda":"0","total":"150000","admin":"2500"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Cek ke FastPay/IAK. Kembalikan detail tagihan: nama, jumlah, periode, denda, biaya admin.'
    )}

    ${epCard('ppob-request','POST','/api/smart/ppob/request','PPOB – Bayar Tagihan',
      [
        {name:'product_code',in:'query',type:'string',req:true,desc:'Kode produk PPOB (dienkripsi)'},
        {name:'customer_id',in:'query',type:'string',req:true,desc:'ID Pelanggan (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening pembayaran (dienkripsi)'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal pembayaran (dienkripsi)'},
        {name:'pin',in:'query',type:'string',req:true,desc:'PIN transaksi (dienkripsi)'},
        {name:'trans_no',in:'query',type:'string',req:true,desc:'Nomor transaksi unik (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Pembayaran Berhasil","ref_no":"FP20240115001","struk":"PLN POSTPAID 150000 OK"}',
      '',
      ['iosCheckAccess','iosTokenMdw','PIN validation','Saldo check','FastPay/IAK API call'],
      'Cek saldo cukup, kirim ke FastPay/IAK, insert gppob_transaction dan gtb_folio. Jika gagal = rollback.'
    )}

    ${epCard('iak-check','POST','/api/smart/iak/check','IAK – Cek Produk',
      [
        {name:'product_code',in:'query',type:'string',req:true,desc:'Kode produk IAK (dienkripsi). Contoh: TSEL5 (Telkomsel 5K)'},
        {name:'customer_id',in:'query',type:'string',req:true,desc:'Nomor HP tujuan (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening pembayaran (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Sukses","product_name":"Telkomsel 5.000","price":"5500","admin":"0"}',
      '',
      ['iosCheckAccess','iosTokenMdw'],
      'Cek ketersediaan dan harga produk IAK (pulsa, paket data, game voucher).'
    )}

    ${epCard('iak-request','POST','/api/smart/iak/request','IAK – Beli Produk',
      [
        {name:'product_code',in:'query',type:'string',req:true,desc:'Kode produk IAK (dienkripsi)'},
        {name:'customer_id',in:'query',type:'string',req:true,desc:'Nomor HP tujuan (dienkripsi)'},
        {name:'account_no',in:'query',type:'string',req:true,desc:'Rekening pembayaran (dienkripsi)'},
        {name:'pin',in:'query',type:'string',req:true,desc:'PIN transaksi (dienkripsi)'},
        {name:'trans_no',in:'query',type:'string',req:true,desc:'Nomor transaksi unik (dienkripsi)'},
        {name:'Authorization',in:'header',type:'string',req:true,desc:'Bearer {token}'},
        {name:'X-Timestamp',in:'header',type:'string',req:true,desc:'Unix timestamp'},
      ],
      '{"status":"00","message":"Transaksi Berhasil","ref_no":"IAK20240115001","sn":"SN123456789"}',
      '',
      ['iosCheckAccess','iosTokenMdw','PIN validation','IAK API call'],
      'Pembelian pulsa/paket via IAK API. SN = serial number produk dari IAK.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: ATM -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-atm">
  <div class="tag-header" onclick="toggleGroup('grp-atm')">
    <i class="fas fa-credit-card" style="color:#dc2626;font-size:18px"></i>
    <div>
      <h2>ATM Cardless</h2>
      <div class="tag-desc">Operasi mesin ATM tanpa kartu – token, saldo, setor, tarik, batal</div>
    </div>
    <span class="tag-count">7 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('atm-create-token','POST','/api/cardless/create-token','ATM – Buat Token Cardless',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening lengkap (format: PREFIX+norek, contoh: 8812341.123456)'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC-SHA256 hash dari mesin ATM'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP address mesin ATM (whitelist)'},
      ],
      '{"status":"00","message":"Token Berhasil.","data":"A1B2C3"}',
      '',
      ['machineCheck middleware','IP whitelist','HMAC hash validation'],
      'Token 6 karakter, berlaku 5 menit. Disimpan di gmob_token. Digunakan untuk transaksi cardless.'
    )}

    ${epCard('atm-get-token','POST','/api/cardless/get-token','ATM – Validasi Token dari Mobile',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening (format BPD)'},
        {name:'transaction_code',in:'query',type:'string',req:true,desc:'Kode transaksi ATM (harus "39")'},
        {name:'transaction_id',in:'query',type:'string',req:true,desc:'ID transaksi ATM'},
        {name:'transaction_datetime',in:'query',type:'string',req:true,desc:'Datetime transaksi (YYYYMMDDHHmmss)'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin ATM'},
      ],
      '{"transaction_code":"39","transaction_id":"TXN001","response_code":"00","token":"A1B2C3"}',
      '',
      ['machineCheck middleware'],
      'Mesin ATM memanggil ini untuk mendapatkan token yang dibuat nasabah dari mobile. response_code: 00=OK, 12=kode salah, 14=rekening tidak aktif, 30=token expired.'
    )}

    ${epCard('atm-balance','POST','/api/cardless/check-balance','ATM – Cek Saldo',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening (format BPD)'},
        {name:'token',in:'query',type:'string',req:true,desc:'Token cardless 6 digit'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin'},
      ],
      '{"status":"00","message":"Sukses","saldo":"1500000","account_no":"1.123456","account_name":"I MADE BUDI"}',
      '',
      ['machineCheck middleware','Token validation'],
      'Validasi token aktif, kembalikan saldo dari gtb_folio (sum kredit-debit).'
    )}

    ${epCard('atm-debit','POST','/api/cardless/cash-debit','ATM – Penarikan Tunai',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening'},
        {name:'token',in:'query',type:'string',req:true,desc:'Token cardless aktif'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal penarikan (numerik)'},
        {name:'transaction_id',in:'query',type:'string',req:true,desc:'ID transaksi ATM unik'},
        {name:'transaction_datetime',in:'query',type:'string',req:true,desc:'Datetime (YYYYMMDDHHmmss)'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin'},
      ],
      '{"status":"00","message":"Penarikan Berhasil","saldo_akhir":"1400000","reference":"ATM20240115001"}',
      '',
      ['machineCheck','Token validation','Saldo check','DB: gtb_folio + gak_mutasi'],
      'Debet rekening nasabah. Insert folio debet ke gtb_folio dan mutasi ke gak_mutasi. Token dinonaktifkan setelah transaksi.'
    )}

    ${epCard('atm-credit','POST','/api/cardless/cash-credit','ATM – Penyetoran Tunai',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening'},
        {name:'token',in:'query',type:'string',req:true,desc:'Token cardless aktif'},
        {name:'amount',in:'query',type:'string',req:true,desc:'Nominal setoran (numerik)'},
        {name:'transaction_id',in:'query',type:'string',req:true,desc:'ID transaksi ATM unik'},
        {name:'transaction_datetime',in:'query',type:'string',req:true,desc:'Datetime (YYYYMMDDHHmmss)'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin'},
      ],
      '{"status":"00","message":"Setoran Berhasil","saldo_akhir":"1600000","reference":"ATM20240115002"}',
      '',
      ['machineCheck','Token validation','DB: gtb_folio + gak_mutasi'],
      'Kredit rekening nasabah. Insert folio kredit ke gtb_folio. Token dinonaktifkan setelah transaksi.'
    )}

    ${epCard('atm-rev-debit','POST','/api/cardless/reversal-debit','ATM – Batal Penarikan',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening'},
        {name:'transaction_id',in:'query',type:'string',req:true,desc:'ID transaksi yang akan dibatalkan'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin'},
      ],
      '{"status":"00","message":"Batal Penarikan Berhasil"}',
      '',
      ['machineCheck','Transaction lookup'],
      'Reversal transaksi penarikan. Hapus record dari gtb_folio dan gak_mutasi berdasarkan transaction_id.'
    )}

    ${epCard('atm-rev-credit','POST','/api/cardless/reversal-credit','ATM – Batal Setoran',
      [
        {name:'account_no',in:'query',type:'string',req:true,desc:'Nomor rekening'},
        {name:'transaction_id',in:'query',type:'string',req:true,desc:'ID transaksi yang akan dibatalkan'},
        {name:'X-Machine-Hash',in:'header',type:'string',req:true,desc:'HMAC hash mesin'},
        {name:'X-Machine-IP',in:'header',type:'string',req:true,desc:'IP mesin'},
      ],
      '{"status":"00","message":"Batal Setoran Berhasil"}',
      '',
      ['machineCheck','Transaction lookup'],
      'Reversal transaksi setoran. Hapus record folio kredit dari database.'
    )}

  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- GROUP: PPOB CALLBACK -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="tag-group" id="grp-ppob-cb">
  <div class="tag-header" onclick="toggleGroup('grp-ppob-cb')">
    <i class="fas fa-reply" style="color:#6b7280;font-size:18px"></i>
    <div>
      <h2>PPOB Callback</h2>
      <div class="tag-desc">Webhook dari FastPay untuk notifikasi hasil transaksi PPOB</div>
    </div>
    <span class="tag-count">1 endpoint</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${epCard('ppob-cb','POST','/api/ppob/callback','PPOB – Notifikasi Callback FastPay',
      [
        {name:'ref_id',in:'body',type:'string',req:true,desc:'Reference ID transaksi dari FastPay'},
        {name:'product_code',in:'body',type:'string',req:true,desc:'Kode produk'},
        {name:'customer_id',in:'body',type:'string',req:true,desc:'ID pelanggan'},
        {name:'status',in:'body',type:'string',req:true,desc:'Status: 00=sukses, lainnya=gagal'},
        {name:'amount',in:'body',type:'number',req:true,desc:'Nominal transaksi'},
        {name:'timestamp',in:'body',type:'string',req:false,desc:'Waktu callback dari FastPay'},
        {name:'X-FastPay-Signature',in:'header',type:'string',req:false,desc:'Tanda tangan dari FastPay (opsional tergantung konfigurasi)'},
      ],
      '{"status":"00","message":"OK"}',
      `{
  "ref_id": "FP20240115001",
  "product_code": "PLN-POSTPAID",
  "customer_id": "12345678901",
  "status": "00",
  "amount": 152500,
  "timestamp": "2024-01-15T10:35:00Z"
}`,
      ['IP whitelist FastPay'],
      'Update status transaksi di gppob_transaction. Jika status gagal, rollback folio nasabah.'
    )}

  </div>
</div>

</main>
</div>

<script>
var openCards = {};
var openGroups = {};

function epToggle(id) {
  var card = document.getElementById('ep-'+id);
  if (!card) return;
  var isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  openCards[id] = !isOpen;
}

function toggleGroup(id) {
  var grp = document.getElementById(id);
  if (!grp) return;
  var body = grp.querySelector('.grp-body');
  if (!body) return;
  var isHidden = body.style.display === 'none';
  body.style.display = isHidden ? '' : 'none';
  var chevron = grp.querySelector('.tag-header .fa-chevron-down, .tag-header .fa-chevron-up');
  if (chevron) {
    chevron.classList.toggle('fa-chevron-down', !isHidden);
    chevron.classList.toggle('fa-chevron-up', isHidden);
  }
}

function showTab(epId, tab) {
  var panes = document.querySelectorAll('#ep-'+epId+' .ep-pane');
  var tabs = document.querySelectorAll('#ep-'+epId+' .ep-tab');
  panes.forEach(function(p){ p.classList.remove('active'); });
  tabs.forEach(function(t){ t.classList.remove('active'); });
  var pane = document.getElementById('pane-'+epId+'-'+tab);
  var tabEl = document.getElementById('tab-'+epId+'-'+tab);
  if (pane) pane.classList.add('active');
  if (tabEl) tabEl.classList.add('active');
}

function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Global token store ───────────────────────────────────────────────────────
var _tokens = { snap: null, ios: null, snapHeaders: {}, iosHeaders: {} };
window._tokenHdrCache = {};


var WHITELIST_IP = '34.50.74.78';

function toggleXFwd(label) {
  var chk = document.getElementById('chk-xforward');
  // If the click came from the label (not directly on checkbox), toggle manually
  if (event && event.target !== chk) {
    chk.checked = !chk.checked;
    event.preventDefault();
  }
  updateXFwdStyle();
}
function updateXFwdStyle() {
  var chk = document.getElementById('chk-xforward');
  var lbl = document.getElementById('xfwd-label');
  if (!lbl) return;
  if (chk && chk.checked) {
    lbl.classList.add('active');
  } else {
    lbl.classList.remove('active');
  }
}

function getBaseUrl() {
  return (document.getElementById('base-url-input').value || '').replace(/\\/+$/, '');
}

// ─── Auto Token ───────────────────────────────────────────────────────────────
function autoToken(type) {
  var btn = document.getElementById('btn-' + type + '-token');
  if (!btn) return;
  var origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Generating...';

  // Read optional client-key override from UI
  var clientKeyEl = document.getElementById('snap-client-key');
  var clientKey = clientKeyEl ? clientKeyEl.value.trim() : '';

  var payload = { type: type, baseUrl: getBaseUrl() };
  if (clientKey) payload.clientKey = clientKey;

  var t0 = Date.now();
  fetch('/api/token/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var ms = Date.now() - t0;
    d._ms = ms;
    if (type === 'snap') {
      _tokens.snap = d.token;
      _tokens.snapHeaders = d.headers || {};
      updateTokenBadge('snap', d.token, d);
      // Inject headers even when token is null (we still have valid timestamp+signature)
      if (d.headers) injectSnapHeaders(d.headers, d.token);
    } else {
      _tokens.ios = d.token;
      _tokens.iosHeaders = d.headers || {};
      updateTokenBadge('ios', d.token, d);
      if (d.headers) injectIosHeaders(d.headers, d.token);
    }
    if (d.token) localStorage.setItem('lpd_'+type+'_token', d.token);
    showTokenDetail(type, d);
  })
  .catch(function(e){
    showTokenDetail(type, { ok: false, error: 'Fetch error: ' + e.message,
      hint: 'Periksa Base URL dan koneksi jaringan.' });
  })
  .finally(function(){ btn.disabled = false; btn.innerHTML = origHtml; });
}

function updateTokenBadge(type, token, d) {
  var el = document.getElementById(type + '-token-badge');
  if (!el) return;
  var dot = el.querySelector('i');
  var txt = el.querySelector('span');
  if (token) {
    el.style.background   = type === 'snap' ? 'rgba(91,33,182,.25)' : 'rgba(6,95,70,.25)';
    el.style.color        = '#e2e8f0';
    el.style.borderColor  = type === 'snap' ? '#7c3aed' : '#059669';
    if (dot) { dot.style.color = type === 'snap' ? '#a78bfa' : '#34d399'; }
    if (txt) txt.textContent  = type.toUpperCase() + ' \u2713 ' + token.substring(0,16) + '...';
    el.title = 'Token: ' + token + (d && d.timestamp ? ' | ' + d.timestamp : '');
  } else {
    var code = (d && (d.responseCode || d.error)) ? String(d.responseCode || d.error).substring(0,12) : 'Gagal';
    el.style.background  = 'rgba(127,29,29,.2)';
    el.style.color       = '#fca5a5';
    el.style.borderColor = '#7f1d1d';
    if (dot) dot.style.color = '#ef4444';
    if (txt) txt.textContent = type.toUpperCase() + ' \u2715 ' + code;
    el.title = d ? JSON.stringify(d.raw || {error: d.error}) : '';
  }
}

function setHeaderInput(epId, key, value) {
  if (!value) return;
  var inp = document.querySelector('#ep-' + epId + ' .try-header-input[data-key="' + key + '"]');
  if (inp) inp.value = value;
}

function injectSnapHeaders(headers, token) {
  ['snap-token','snap-inquiry','snap-payment'].forEach(function(id) {
    setHeaderInput(id, 'X-TIMESTAMP',  headers['X-TIMESTAMP']);
    setHeaderInput(id, 'X-CLIENT-KEY', headers['X-CLIENT-KEY']);
    setHeaderInput(id, 'X-SIGNATURE',  headers['X-SIGNATURE']);
    if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
  });
}

function injectIosHeaders(headers, token) {
  // Inject into all non-SNAP, non-callback cards
  document.querySelectorAll('.ep-card').forEach(function(card) {
    var id = card.id.replace('ep-','');
    if (id && !id.startsWith('snap') && id !== 'ppob-cb') {
      setHeaderInput(id, 'X-TIMESTAMP', headers['X-TIMESTAMP']);
      setHeaderInput(id, 'X-CLIENT-ID', headers['X-CLIENT-ID']);
      setHeaderInput(id, 'X-SIGNATURE', headers['X-SIGNATURE']);
      if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
    }
  });
}

// ─── Token Detail Panel ───────────────────────────────────────────────────────
function showTokenDetail(type, d) {
  var panel = document.getElementById('token-detail-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'token-detail-panel';
    panel.style.cssText = [
      'position:fixed;bottom:0;right:0;width:500px;max-height:90vh;overflow-y:auto',
      'background:#0f172a;color:#e2e8f0;border-radius:12px 0 0 0;z-index:9999',
      'box-shadow:-4px -4px 40px rgba(0,0,0,.7);font-size:12px;font-family:monospace',
      'border-top:2px solid #334155;border-left:2px solid #334155;transition:all .2s'
    ].join(';');
    document.body.appendChild(panel);
  }

  var ok      = !!(d.token);
  var hasResp = !!(d.responseCode || d.httpStatus);
  var isSnap  = type === 'snap';
  var accent  = ok ? '#22c55e' : (hasResp ? '#f59e0b' : '#ef4444');
  var icon    = ok ? 'fa-check-circle' : (hasResp ? 'fa-exclamation-triangle' : 'fa-times-circle');
  var ms      = d._ms ? '<span style="color:#475569;font-weight:400;font-size:11px">' + d._ms + ' ms</span>' : '';

  // ── Header rows (always shown if we got headers from signing) ──────────────
  var hdr = d.headers || {};
  // Store header values in a temp object accessible by copyHdr() below
  window._tokenHdrCache = hdr;
  var headerBlock = '';
  if (Object.keys(hdr).length > 0) {
    var hdrIdx = 0;
    var hdrRows = Object.keys(hdr).map(function(k) {
      var v = hdr[k];
      var shortened = v && v.length > 60 ? v.substring(0,60) + '...' : v;
      var color = k === 'X-SIGNATURE' ? '#86efac' : k === 'X-TIMESTAMP' ? '#c4b5fd' : '#fbbf24';
      var safeKey = k;
      return '<tr>'
        + '<td style="color:#64748b;padding:3px 10px 3px 0;white-space:nowrap;vertical-align:top;font-size:11px">' + safeKey + '</td>'
        + '<td style="padding:3px 0"><code style="color:' + color + ';word-break:break-all;font-size:11px">' + shortened + '</code>'
        + ' <button onclick="copyHdr(&quot;' + safeKey + '&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px" title="Copy">&#128203;</button>'
        + '</td></tr>';
    }).join('');
    headerBlock = '<div style="margin-bottom:8px">'
      + '<div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Generated Request Headers</div>'
      + '<table style="width:100%;border-collapse:collapse;line-height:1.6">'
        + hdrRows
        + '<tr><td style="color:#64748b;font-size:11px;padding:2px 10px 2px 0">X-Forwarded-For</td><td><code style="color:#f59e0b">34.50.74.78</code> <button id="copy-xfwd" onclick="copyHdr(&quot;X-Forwarded-For&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px">&#128203;</button></td></tr>'
      + '</table>'
      + '</div>';
  }

  // ── Response rows ──────────────────────────────────────────────────────────
  var respRows = '';
  if (d.url)            respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">URL</td><td><code style="color:#7dd3fc;word-break:break-all;font-size:10px">' + d.url + '</code></td></tr>';
  if (d.httpStatus)     respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">HTTP Status</td><td><code style="color:' + (d.httpStatus===200?'#4ade80':'#fbbf24') + '">' + d.httpStatus + '</code></td></tr>';
  if (d.responseCode)   respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseCode</td><td><code style="color:' + (d.responseCode==='2007300'?'#4ade80':'#fbbf24') + '">' + d.responseCode + '</code></td></tr>';
  if (d.responseMessage)respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseMessage</td><td><code style="color:#94a3b8">' + d.responseMessage + '</code></td></tr>';
  if (d.token)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">accessToken</td><td><code style="color:#4ade80;word-break:break-all;font-size:10px">' + d.token + '</code></td></tr>';
  if (d.error)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">error</td><td><code style="color:#f87171;word-break:break-all;font-size:10px">' + d.error + '</code></td></tr>';
  if (d.hint)           respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">hint</td><td><code style="color:#fbbf24;font-size:10px">' + d.hint + '</code></td></tr>';

  // ── Status notes ───────────────────────────────────────────────────────────
  var noteHtml = '';
  if (ok) {
    noteHtml = '<div style="padding:10px 0 4px;color:#60a5fa;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-magic" style="color:#a78bfa"></i> X-TIMESTAMP, X-' + (isSnap?'CLIENT-KEY':'CLIENT-ID') + ', X-SIGNATURE & Authorization <b>diisi otomatis</b>.<br>'
      + '<i class="fas fa-shield-alt" style="color:#f59e0b"></i> X-Forwarded-For: 34.50.74.78 diinjeksi otomatis ke setiap request.<br>'
      + '<i class="fas fa-clock" style="color:#94a3b8"></i> Token berlaku 3 menit dari: ' + (d.timestamp||'') + '.'
      + '</div>';
  } else if (isSnap && d.responseCode === '4017301') {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-info-circle"></i> <b>responseCode 4017301</b> = "Invalid access Token"<br>'
      + 'Artinya signature sampai ke server tetapi verifikasi gagal. Server memverifikasi menggunakan <b>public_key_bpd.pem</b>.<br>'
      + '<span style="color:#94a3b8">Diperlukan private key BPD (dari bank BPD Bali) untuk mendapatkan token SNAP yang valid.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else if (!isSnap && d.httpStatus === 500) {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-database"></i> <b>HTTP 500</b> = Server error internal.<br>'
      + 'Kemungkinan koneksi database SQL Server di server production bermasalah.<br>'
      + '<span style="color:#94a3b8">Signature iOS sudah digenerate dengan benar menggunakan <b>private_key_lpd.pem</b>.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else {
    noteHtml = '<div style="padding:10px 0 4px;color:#f87171;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-exclamation-circle"></i> Koneksi ke server gagal. Periksa Base URL dan pastikan server berjalan.'
      + '</div>';
  }

  // ── Assemble panel ─────────────────────────────────────────────────────────
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:2px solid #1e293b;background:#020617;position:sticky;top:0;z-index:1">'
      + '<i class="fas ' + icon + '" style="color:' + accent + ';font-size:15px"></i>'
      + '<b style="color:' + accent + ';font-size:13px">' + type.toUpperCase() + ' Token — '
        + (ok ? '&#10003; Berhasil' : (hasResp ? '&#9888; Respons Server' : '&#10007; Gagal')) + '</b>'
      + ms
      + '<button onclick="closeTokenPanel()" style="margin-left:auto;background:transparent;border:none;color:#64748b;cursor:pointer;font-size:18px;line-height:1;padding:0 4px">&times;</button>'
    + '</div>'
    + '<div style="padding:14px 16px">'
      + headerBlock
      + (respRows ? '<div style="margin-top:8px"><div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Server Response</div><table style="width:100%;border-collapse:collapse;line-height:1.7">' + respRows + '</table></div>' : '')
      + noteHtml
    + '</div>';

  panel.style.display = 'block';
  clearTimeout(panel._timer);
  // Keep open longer if error (user needs to read)
  panel._timer = setTimeout(function(){ panel.style.display='none'; }, ok ? 10000 : 20000);
}

// Keep showTokenToast as alias for compatibility
function showTokenToast(type, d) { showTokenDetail(type, d); }

function closeTokenPanel() {
  var p = document.getElementById('token-detail-panel');
  if (p) p.style.display = 'none';
}



// ─── Copy header value to clipboard ──────────────────────────────────────────
function copyHdr(key) {
  var cache = window._tokenHdrCache || {};
  var val = cache[key] || (key === 'X-Forwarded-For' ? WHITELIST_IP : '');
  if (!val) return;
  try {
    navigator.clipboard.writeText(val).then(function() {
      var btns = document.querySelectorAll('[onclick*="copyHdr(\\"' + key + '\\")"]');
      btns.forEach(function(b) {
        var o = b.innerHTML; b.innerHTML = '&#10003;';
        setTimeout(function(){ b.innerHTML = o; }, 1200);
      });
    });
  } catch(e) {
    var ta = document.createElement('textarea');
    ta.value = val; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  }
}

// ─── Try Request (+ X-Forwarded-For otomatis) ────────────────────────────────
function tryRequest(epId) {
  var btn = document.getElementById('try-btn-'+epId);
  var method = btn.getAttribute('data-method');
  var path = btn.getAttribute('data-path');
  var baseUrl = getBaseUrl();
  var url = baseUrl + path;

  var headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

  // Inject X-Forwarded-For jika checkbox aktif (default: aktif)
  var chk = document.getElementById('chk-xforward');
  var xfwdOn = chk ? chk.checked : true;  // default on jika elemen tidak ada
  if (xfwdOn) {
    headers['X-Forwarded-For'] = WHITELIST_IP;
    headers['X-Real-IP']       = WHITELIST_IP;
  }

  // Collect header inputs
  document.querySelectorAll('#ep-'+epId+' .try-header-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) headers[k] = v;
  });

  // Collect query params
  var queryParams = [];
  document.querySelectorAll('#ep-'+epId+' .try-query-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) queryParams.push(encodeURIComponent(k)+'='+encodeURIComponent(v));
  });
  if (queryParams.length) url += '?' + queryParams.join('&');

  var bodyEl = document.getElementById('try-body-'+epId);
  var bodyStr = bodyEl ? bodyEl.value.trim() : '';

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';
  document.getElementById('resp-'+epId).style.display = 'none';

  var fetchOpts = { method: method, headers: headers };
  if (method === 'POST' && bodyStr) {
    try { JSON.parse(bodyStr); fetchOpts.body = bodyStr; } catch(e) {}
  }

  var reqInfo = method + ' ' + url;
  var t0 = Date.now();

  // Build sent-headers summary (exclude Content-Type for display)
  var sentHdrs = Object.keys(headers).filter(function(k){ return k !== 'Accept'; }).map(function(k){
    var v = headers[k];
    // Truncate long values
    return k + ': ' + (v && v.length > 40 ? v.substring(0,38) + '…' : v);
  }).join(String.fromCharCode(10));

  fetch(url, fetchOpts)
    .then(function(r) {
      var ms = Date.now() - t0;
      return r.text().then(function(text){ return { status: r.status, text: text, ms: ms }; });
    })
    .then(function(d){ showResponse(epId, d.status, d.text, d.ms, reqInfo, sentHdrs); })
    .catch(function(err) {
      var NL = String.fromCharCode(10);
      showResponse(epId, 0, 'Network Error: ' + err.message + NL + NL + 'Pastikan:' + NL + '1. Base URL benar' + NL + '2. Server berjalan' + NL + '3. CORS diizinkan', Date.now()-t0, reqInfo, sentHdrs);
    })
    .finally(function() {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
    });
}

function showResponse(epId, status, text, ms, reqInfo, sentHdrs) {
  var box = document.getElementById('resp-'+epId);
  var codeEl = document.getElementById('resp-status-'+epId);
  var timeEl = document.getElementById('resp-time-'+epId);
  var bodyEl = document.getElementById('resp-body-'+epId);
  var reqEl  = document.getElementById('resp-req-'+epId);
  var hdrsEl = document.getElementById('resp-hdrs-'+epId);

  box.style.display = 'block';
  timeEl.textContent = ms + ' ms';
  if (reqEl && reqInfo) reqEl.textContent = reqInfo;
  if (hdrsEl && sentHdrs) {
    hdrsEl.textContent = sentHdrs;
    hdrsEl.style.display = 'block';
  }

  var cls = status >= 200 && status < 300 ? 'status-2xx' : status >= 400 && status < 500 ? 'status-4xx' : 'status-5xx';
  if (status === 0) cls = 'status-5xx';
  codeEl.className = 'status-code ' + cls;
  codeEl.textContent = status || 'ERR';

  try {
    var parsed = JSON.parse(text);
    bodyEl.innerHTML = syntaxHighlight(JSON.stringify(parsed, null, 2));
  } catch(e) {
    bodyEl.textContent = text;
  }
}

function syntaxHighlight(json) {
  json = json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return json.replace(/(\\s*)(\\\"[^\\\"]*\\\")\\s*:\\s*/g, function(m,sp,key){
    return sp + '<span class="jk">'+key+'</span>: ';
  }).replace(/:\\s*(\\\"[^\\\"]*\\\")/g, function(m,val){
    return ': <span class="js">'+val+'</span>';
  }).replace(/:\\s*(-?\\d+\\.?\\d*)/g, function(m,num){
    return ': <span class="jn">'+num+'</span>';
  }).replace(/:\\s*(true|false)/g, function(m,b){
    return ': <span class="jb">'+b+'</span>';
  }).replace(/:\\s*(null)/g, function(m,n){
    return ': <span class="jnull">'+n+'</span>';
  });
}

function copyExample(epId) {
  var el = document.getElementById('try-body-'+epId);
  var ex = el ? el.getAttribute('data-example') : '';
  if (el && ex) { el.value = ex; }
}

// Base URL change -> persist
document.getElementById('base-url-input').addEventListener('change', function() {
  localStorage.setItem('lpd_base_url', this.value);
});
(function(){
  var saved = localStorage.getItem('lpd_base_url');
  if (saved) document.getElementById('base-url-input').value = saved;
  // Restore token badges dari localStorage
  var st = localStorage.getItem('lpd_snap_token');
  var it = localStorage.getItem('lpd_ios_token');
  if (st) { _tokens.snap = st; updateTokenBadge('snap', st); }
  if (it) { _tokens.ios = it; updateTokenBadge('ios', it); }
})();
</script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helper: render satu endpoint card
// ─────────────────────────────────────────────────────────────────────────────
interface Param {
  name: string;
  in: 'header'|'query'|'body'|'path';
  type: string;
  req: boolean;
  desc: string;
}

function epCard(
  id: string,
  method: string,
  path: string,
  summary: string,
  params: Param[],
  exampleResponse: string,
  exampleBody: string,
  middlewares: string[],
  note: string,
): string {
  const mbClass = method === 'POST' ? 'mb-post' : 'mb-get';

  // Params table
  const paramRows = params.map(p => `
    <tr>
      <td><span class="param-name">${p.name}</span></td>
      <td><span class="param-type">${p.type}</span></td>
      <td><span class="param-in">${p.in}</span></td>
      <td><span class="${p.req ? 'param-req' : 'param-opt'}">${p.req ? 'required' : 'optional'}</span></td>
      <td style="color:#374151;font-size:12px">${p.desc}</td>
    </tr>`).join('')

  // Try inputs split by location
  const headerParams = params.filter(p => p.in === 'header')
  const queryParams  = params.filter(p => p.in === 'query')
  const bodyParams   = params.filter(p => p.in === 'body')

  const headerInputs = headerParams.length ? `
    <div class="try-label">Headers</div>
    ${headerParams.map(p => `
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${p.name}${p.req?' <span style="color:red">*</span>':''}</label>
      <input class="try-input try-header-input" data-key="${p.name}" type="text"
        placeholder="${p.name === 'Authorization' ? 'Bearer eyJ0eXAi...' : p.name === 'X-TIMESTAMP' ? '2024-01-15T10:30:00+07:00' : p.type}"/>
    </div>`).join('')}` : ''

  const queryInputs = queryParams.length ? `
    <div class="try-label" style="margin-top:8px">Query Parameters</div>
    ${queryParams.map(p => `
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${p.name}${p.req?' <span style="color:red">*</span>':''}</label>
      <input class="try-input try-query-input" data-key="${p.name}" type="text" placeholder="${p.type}"/>
    </div>`).join('')}` : ''

  const bodyInput = bodyParams.length ? `
    <div class="try-label" style="margin-top:8px">Request Body (JSON)</div>
    ${exampleBody ? `<button onclick="copyExample('${id}')" style="font-size:11px;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 8px;border-radius:4px;cursor:pointer;margin-bottom:6px;color:#475569"><i class="fas fa-copy" style="margin-right:4px"></i>Isi Contoh</button>` : ''}
    <textarea id="try-body-${id}" class="try-input try-textarea" data-example="${exampleBody.replace(/"/g,'&quot;')}"
      placeholder='${JSON.stringify(Object.fromEntries(bodyParams.map(p=>[p.name,p.type])),null,2)}'>${exampleBody}</textarea>` : ''

  const mwBadges = middlewares.map(m =>
    `<span class="mw-badge"><i class="fas fa-shield-alt"></i>${m}</span>`).join('')

  const noteHtml = note ? `<div class="info-box ib-blue" style="margin-top:12px"><i class="fas fa-info-circle"></i><span>${note}</span></div>` : ''

  const respHtml = exampleResponse ? `
    <div class="try-label">Contoh Response 200 OK</div>
    <div class="schema-obj">${syntaxHighlightStatic(exampleResponse)}</div>` : ''

  return `
<div class="ep-card" id="ep-${id}">
  <div class="ep-header" onclick="epToggle('${id}')">
    <span class="method-badge ${mbClass}">${method}</span>
    <span class="ep-path">${path}</span>
    <span class="ep-summary">${summary}</span>
    <i class="fas fa-chevron-down ep-chevron"></i>
  </div>
  <div class="ep-body">
    <div class="ep-tabs">
      <div class="ep-tab active" id="tab-${id}-params" onclick="showTab('${id}','params')">Parameters</div>
      <div class="ep-tab" id="tab-${id}-response" onclick="showTab('${id}','response')">Response</div>
      <div class="ep-tab" id="tab-${id}-try" onclick="showTab('${id}','try')">Try it out</div>
    </div>

    <!-- PARAMS TAB -->
    <div class="ep-pane active" id="pane-${id}-params">
      ${mwBadges ? `<div style="margin-bottom:10px">${mwBadges}</div>` : ''}
      ${noteHtml}
      <table class="param-table">
        <thead><tr><th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>${paramRows}</tbody>
      </table>
    </div>

    <!-- RESPONSE TAB -->
    <div class="ep-pane" id="pane-${id}-response">
      ${respHtml}
      <div class="try-label" style="margin-top:16px">Response Codes</div>
      <table class="param-table" style="margin-top:6px">
        <thead><tr><th>Status / Code</th><th>Arti</th></tr></thead>
        <tbody>
          <tr><td><span style="color:#16a34a;font-weight:700">200 / 00</span></td><td>Sukses</td></tr>
          <tr><td><span style="color:#d97706;font-weight:700">81</span></td><td>Inquiry sukses, lanjut ke posting</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">01</span></td><td>Data tidak ditemukan / rekening tidak aktif</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">40</span></td><td>Saldo tidak mencukupi</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">45</span></td><td>Transaksi duplikat</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">51-53</span></td><td>Hash mismatch (data dimodifikasi)</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">54</span></td><td>PIN salah</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">62</span></td><td>Transaksi tidak dapat diproses</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">68</span></td><td>Timeout / exception</td></tr>
        </tbody>
      </table>
    </div>

    <!-- TRY IT OUT TAB -->
    <div class="ep-pane" id="pane-${id}-try">
      <div class="try-panel">
        ${headerInputs}
        ${queryInputs}
        ${bodyInput}
        <div style="display:flex;align-items:center;margin-top:14px;flex-wrap:wrap;gap:8px">
          <button class="try-btn" id="try-btn-${id}" data-method="${method}" data-path="${path}" onclick="tryRequest('${id}')">
            <i class="fas fa-paper-plane"></i> Send Request
          </button>
          <button class="try-clear" onclick="document.getElementById('resp-${id}').style.display='none'">Clear</button>
          <span style="font-size:11px;color:var(--muted);margin-left:auto">
            <i class="fas fa-info-circle"></i> Request dikirim ke Base URL di atas
          </span>
        </div>
        <div id="resp-${id}" class="response-box" style="display:none">
          <div class="response-status">
            <span class="status-code" id="resp-status-${id}">200</span>
            <span style="color:#94a3b8;font-size:12px">Response</span>
            <span class="response-time" id="resp-time-${id}"></span>
            <span id="resp-req-${id}" style="color:#475569;font-size:10px;margin-left:8px;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px"></span>
          </div>
          <pre id="resp-hdrs-${id}" style="display:none;background:#0a0f1e;color:#475569;font-size:10px;padding:8px 14px;margin:0;border-bottom:1px solid #1e293b;white-space:pre;font-family:monospace;line-height:1.5"></pre>
          <pre class="response-body" id="resp-body-${id}"></pre>
        </div>
      </div>
    </div>

  </div>
</div>`
}

// Static syntax highlight untuk contoh response
function syntaxHighlightStatic(json: string): string {
  try {
    const formatted = JSON.stringify(JSON.parse(json), null, 2)
    return formatted
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/("[\w-]+")\s*:/g, '<span class="hl-key">$1</span>:')
      .replace(/:\s*(".*?")/g, ': <span class="hl-str">$1</span>')
      .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="hl-num">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="hl-bool">$1</span>')
  } catch {
    return json
  }
}
