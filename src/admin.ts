/**
 * LPD Seminyak — Admin Panel HTML
 * Panel manajemen untuk monitoring dan pengelolaan sistem
 */

export function getAdminHTML(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak — Admin Panel</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
:root{--primary:#0f766e;--primary-dark:#0d5752;--secondary:#0f172a;--sidebar-w:240px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}

/* ── SIDEBAR ── */
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#134e4a;overflow-y:auto;z-index:100;border-right:1px solid #0d3b37;display:flex;flex-direction:column}
#sidebar .logo{padding:16px 14px 12px;background:linear-gradient(135deg,#0d3b37,#0f766e);border-bottom:1px solid #0d3b37}
#sidebar .logo h1{font-size:14px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#99f6e4;margin-top:2px}
#sidebar nav{flex:1;padding:8px 0}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#99f6e4;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(20,184,166,.2);border-left-color:#14b8a6}
#sidebar nav a i{width:16px;text-align:center;font-size:12px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#0d6b65}
#sidebar .sidebar-footer{padding:12px 14px;border-top:1px solid #0d3b37;font-size:10px;color:#4d9e99}

/* ── MAIN ── */
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#134e4a;border-bottom:1px solid #0d3b37;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:15px;font-weight:700;color:#a7f3d0}
.topbar-right{display:flex;align-items:center;gap:12px;font-size:11px;color:#5eead4}
.section{display:none}.section.active{display:block}
.content{padding:20px 24px}

/* ── CARDS ── */
.stat-card{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px;position:relative;overflow:hidden;transition:border-color .2s}
.stat-card:hover{border-color:#14b8a6}
.stat-card .sc-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:10px}
.stat-card .sc-val{font-size:26px;font-weight:800;color:#e2e8f0;line-height:1}
.stat-card .sc-label{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
.stat-card .sc-sub{font-size:11px;color:#14b8a6;margin-top:4px}

/* ── PANEL ── */
.panel{background:#1e293b;border:1px solid #334155;border-radius:10px;margin-bottom:16px;overflow:hidden}
.panel-header{padding:12px 16px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between}
.panel-header-left{display:flex;align-items:center;gap:8px}
.panel-header h3{font-size:13px;font-weight:700;color:#5eead4}
.panel-header .badge{font-size:10px;padding:2px 7px;border-radius:999px;background:#134e4a;color:#5eead4;font-weight:600}
.panel-body{padding:16px}

/* ── TABLE ── */
.data-table{width:100%;border-collapse:collapse;font-size:12px}
.data-table th{text-align:left;padding:8px 12px;background:#0f172a;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px;font-size:10px;border-bottom:1px solid #1e293b;white-space:nowrap}
.data-table td{padding:8px 12px;border-bottom:1px solid #1e293b;color:#cbd5e1;vertical-align:top}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:rgba(20,184,166,.04)}
.data-table td.mono{font-family:'Courier New',monospace;font-size:11px;color:#67e8f9;word-break:break-all}
.data-table td.ts{font-family:'Courier New',monospace;font-size:11px;color:#94a3b8;white-space:nowrap}
.data-table td.url{font-family:'Courier New',monospace;font-size:10px;color:#a5b4fc;word-break:break-all;max-width:200px}
.data-table td.status-ok{color:#34d399;font-weight:700}
.data-table td.status-err{color:#f87171;font-weight:700}
.data-table td.status-warn{color:#fbbf24;font-weight:700}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#0f766e,#0d6b65);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#0d6b65,#0a5952);transform:translateY(-1px)}
.btn-secondary{background:#1e293b;border:1px solid #334155;color:#94a3b8}
.btn-secondary:hover{background:#334155;color:#e2e8f0}
.btn-sm{padding:4px 10px;font-size:10px}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

/* ── FORM ── */
label{display:block;font-size:10px;font-weight:700;color:#64748b;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=date],select,textarea{width:100%;background:#0f172a;border:1px solid #334155;border-radius:6px;padding:8px 10px;color:#e2e8f0;font-size:12px;font-family:'Courier New',monospace;outline:none;transition:border .15s}
input[type=text]:focus,input[type=date]:focus,select:focus,textarea:focus{border-color:#0f766e}
select{cursor:pointer}

/* ── MISC ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}
@media(max-width:1100px){.grid-4{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
.field-row{margin-bottom:10px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:2px;flex-shrink:0}
.info-teal{background:#0d3b37;border-left:3px solid #14b8a6;color:#99f6e4}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.badge-pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700}
.badge-ok{background:#022c22;color:#34d399}
.badge-warn{background:#2c1900;color:#fbbf24}
.badge-err{background:#2d0000;color:#f87171}
.badge-info{background:#0d3b37;color:#5eead4}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#14b8a6;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:40px 20px;color:#475569}
.empty-state i{font-size:36px;margin-bottom:10px;display:block}
.log-entry{border:1px solid #1e293b;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#0a0f1a}
.log-entry-header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#0f172a;cursor:pointer;user-select:none}
.log-entry-body{padding:12px;font-size:11px;font-family:'Courier New',monospace;color:#7dd3fc;white-space:pre-wrap;word-break:break-all;display:none;max-height:300px;overflow-y:auto;line-height:1.6}
.log-entry-body.show{display:block}
.method-tag{font-size:9px;font-weight:800;padding:2px 7px;border-radius:4px}
.method-post{background:#1e1b4b;color:#a78bfa}
.method-get{background:#022c22;color:#34d399}
.search-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.search-bar input,.search-bar select{flex:1;min-width:120px;padding:7px 10px;font-size:12px}
.pagination{display:flex;align-items:center;justify-content:space-between;padding:10px 0;font-size:11px;color:#64748b}
.pagination-btns{display:flex;gap:6px}
.chart-container{position:relative;height:180px}
.section-title{font-size:13px;font-weight:700;color:#5eead4;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.section-title i{font-size:14px}
.tag{display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;background:#1e293b;color:#94a3b8;margin:1px}
.separator{height:1px;background:#1e293b;margin:12px 0}
.truncate-cell{max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:help}

/* ── MOBILE ── */
#menu-toggle{display:none;background:none;border:none;color:#5eead4;font-size:20px;cursor:pointer;padding:4px}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99}
#sidebar-overlay.show{display:block}
@media(max-width:768px){
  #menu-toggle{display:block}
  #sidebar{transform:translateX(-100%);transition:transform .25s}
  #sidebar.open{transform:translateX(0)}
  #sidebar-overlay.show{display:block}
  #main{margin-left:0}
  .topbar{padding:10px 14px}
}
</style>
</head>
<body>

<!-- Sidebar overlay -->
<div id="sidebar-overlay" onclick="closeSidebar()"></div>

<!-- ── SIDEBAR ── -->
<aside id="sidebar">
  <div class="logo">
    <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
    <p>Admin Management Panel</p>
  </div>
  <nav>
    <div class="nav-section">Dashboard</div>
    <a href="#" onclick="showSection('dashboard')" id="nav-dashboard" class="active">
      <i class="fas fa-tachometer-alt"></i> Overview
    </a>
    <a href="#" onclick="showSection('activity')" id="nav-activity">
      <i class="fas fa-chart-line"></i> Aktivitas Harian
    </a>

    <div class="nav-section">Monitoring</div>
    <a href="#" onclick="showSection('logs-access')" id="nav-logs-access">
      <i class="fas fa-sign-in-alt"></i> Log Akses Nasabah
    </a>
    <a href="#" onclick="showSection('logs-transfer')" id="nav-logs-transfer">
      <i class="fas fa-exchange-alt"></i> Log Transfer
    </a>
    <a href="#" onclick="showSection('logs-tabungan')" id="nav-logs-tabungan">
      <i class="fas fa-piggy-bank"></i> Log Tabungan
    </a>
    <a href="#" onclick="showSection('logs-token')" id="nav-logs-token">
      <i class="fas fa-key"></i> Log Token / SNAP
    </a>

    <div class="nav-section">Analisis</div>
    <a href="#" onclick="showSection('stats')" id="nav-stats">
      <i class="fas fa-chart-bar"></i> Statistik API
    </a>
    <a href="#" onclick="showSection('errors')" id="nav-errors">
      <i class="fas fa-exclamation-triangle"></i> Error Log
    </a>

    <div class="nav-section">Sistem</div>
    <a href="#" onclick="showSection('crypto-ops')" id="nav-crypto-ops">
      <i class="fas fa-lock"></i> Crypto Test
    </a>
    <a href="/crypto" target="_blank">
      <i class="fas fa-tools"></i> Crypto Toolkit <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
    <a href="/swagger" target="_blank">
      <i class="fas fa-book"></i> Swagger API <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
  </nav>
  <div class="sidebar-footer">
    <div><i class="fas fa-circle" style="color:#22c55e;font-size:7px"></i> Production: lpdseminyak.biz.id</div>
    <div style="margin-top:3px"><i class="fas fa-clock"></i> <span id="sidebar-time">—</span></div>
  </div>
</aside>

<!-- ── MAIN ── -->
<main id="main">

  <!-- TOPBAR -->
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <button id="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
      <h2 id="topbar-title"><i class="fas fa-tachometer-alt mr-2"></i>Overview</h2>
    </div>
    <div class="topbar-right">
      <span id="topbar-date" style="font-size:11px;color:#5eead4"></span>
      <button class="btn btn-secondary btn-sm" onclick="refreshAll()"><i class="fas fa-sync-alt"></i> Refresh</button>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: DASHBOARD
  ═══════════════════════════════════════════════════ -->
  <div id="section-dashboard" class="section active content">

    <div class="grid-4" style="margin-bottom:16px" id="stat-cards">
      <div class="stat-card">
        <div class="sc-icon" style="background:#0d3b37"><i class="fas fa-sign-in-alt" style="color:#14b8a6"></i></div>
        <div class="sc-val" id="stat-total-access">—</div>
        <div class="sc-label">Total Login Hari Ini</div>
        <div class="sc-sub" id="stat-access-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1e1b4b"><i class="fas fa-exchange-alt" style="color:#a78bfa"></i></div>
        <div class="sc-val" id="stat-total-transfer">—</div>
        <div class="sc-label">Transfer Hari Ini</div>
        <div class="sc-sub" id="stat-transfer-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#022c22"><i class="fas fa-key" style="color:#34d399"></i></div>
        <div class="sc-val" id="stat-total-token">—</div>
        <div class="sc-label">Token Request Hari Ini</div>
        <div class="sc-sub" id="stat-token-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1c0d00"><i class="fas fa-exclamation-triangle" style="color:#f97316"></i></div>
        <div class="sc-val" id="stat-total-errors">—</div>
        <div class="sc-label">Error 7 Hari</div>
        <div class="sc-sub" id="stat-error-sub">memuat...</div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-sign-in-alt mr-2"></i>Login Terbaru</h3>
            <span class="badge" id="badge-recent-access">—</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-access')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Status</th></tr></thead>
            <tbody id="recent-access-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-exchange-alt mr-2"></i>Transfer Terbaru</h3>
            <span class="badge" id="badge-recent-transfer">—</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-transfer')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Nominal</th></tr></thead>
            <tbody id="recent-transfer-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-history mr-2"></i>File Log Tersedia</h3>
        </div>
      </div>
      <div class="panel-body" id="log-files-overview">
        <div style="color:#475569;font-size:12px">Memuat...</div>
      </div>
    </div>

  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: AKTIVITAS HARIAN
  ═══════════════════════════════════════════════════ -->
  <div id="section-activity" class="section content">
    <div class="section-title"><i class="fas fa-chart-line"></i> Aktivitas Harian — Request per Jam</div>

    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-calendar mr-2"></i>Pilih Tanggal & Tipe Log</h3>
        </div>
        <button class="btn btn-primary btn-sm" onclick="loadActivity()"><i class="fas fa-search"></i> Load</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row">
            <label>Tanggal</label>
            <input type="date" id="act-date" />
          </div>
          <div class="field-row">
            <label>Tipe Log</label>
            <select id="act-type">
              <option value="access">Access (Login/Logout)</option>
              <option value="transfer-AR">Transfer Bank (AR)</option>
              <option value="transfer-AB">Transfer LPD (AB)</option>
              <option value="tabungan">Tabungan / Mutasi</option>
              <option value="token">Token SNAP</option>
            </select>
          </div>
          <div class="field-row">
            <label>Filter Endpoint</label>
            <input type="text" id="act-filter" placeholder="cth: login, transfer, inquiry" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Request Per Jam</h3><span class="badge" id="badge-act-total">0</span></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-hourly"></canvas></div></div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Distribusi Endpoint</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-endpoint"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list mr-2"></i>Log Entries</h3><span class="badge" id="badge-act-entries">0</span></div>
      </div>
      <div class="panel-body" style="padding:0">
        <div id="activity-log-list" style="padding:12px"></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG AKSES
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-access" class="section content">
    <div class="section-title"><i class="fas fa-sign-in-alt"></i> Log Akses Nasabah</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadAccessLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="acc-date"/></div>
          <div class="field-row"><label>Sumber File</label>
            <select id="acc-source">
              <option value="root">Root (access-YYYY-MM-DD.txt)</option>
              <option value="his">his/ (access-YYYY-MM-DD.txt)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="acc-search" placeholder="endpoint, username hash, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-acc-count">0</span></div>
      </div>
      <div id="access-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TRANSFER
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-transfer" class="section content">
    <div class="section-title"><i class="fas fa-exchange-alt"></i> Log Transfer</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTransferLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tr-date"/></div>
          <div class="field-row"><label>Tipe Transfer</label>
            <select id="tr-type">
              <option value="AR">Transfer Bank Antar (AR)</option>
              <option value="AB">Transfer LPD Antar (AB)</option>
              <option value="in">Transfer In (Masuk)</option>
            </select>
          </div>
          <div class="field-row"><label>Sumber</label>
            <select id="tr-source">
              <option value="root">Root</option>
              <option value="his">his/</option>
            </select>
          </div>
        </div>
        <div class="field-row"><label>Cari Teks</label><input type="text" id="tr-search" placeholder="endpoint, reference, ..."/></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tr-count">0</span></div>
      </div>
      <div id="transfer-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TABUNGAN
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-tabungan" class="section content">
    <div class="section-title"><i class="fas fa-piggy-bank"></i> Log Tabungan & Mutasi</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTabunganLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tab-date"/></div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tab-search" placeholder="customer_id, endpoint..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tab-count">0</span></div>
      </div>
      <div id="tabungan-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: LOG TOKEN
  ═══════════════════════════════════════════════════ -->
  <div id="section-logs-token" class="section content">
    <div class="section-title"><i class="fas fa-key"></i> Log Token / SNAP B2B</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTokenLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tok-date"/></div>
          <div class="field-row"><label>Tipe</label>
            <select id="tok-type">
              <option value="root">Root (token-YYYY-MM-DD.txt)</option>
              <option value="token-dir">token/ (request-YYYY-MM-DD.log)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tok-search" placeholder="accessToken, responseCode..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tok-count">0</span></div>
      </div>
      <div id="token-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: STATISTIK
  ═══════════════════════════════════════════════════ -->
  <div id="section-stats" class="section content">
    <div class="section-title"><i class="fas fa-chart-bar"></i> Statistik API</div>
    <div class="info-box info-teal">
      <i class="fas fa-info-circle"></i>
      Statistik dihitung dari file log yang tersedia di storage Laravel.
      Data diambil secara real-time dari server.
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Top Endpoints (7 Hari)</h3></div></div>
        <div class="panel-body" id="stats-endpoints">
          <div style="color:#475569;text-align:center;padding:20px">Memuat...</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Aktivitas Per Hari (30 Hari)</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-daily"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3>Daftar File Log</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadStats()"><i class="fas fa-sync-alt"></i> Refresh</button>
      </div>
      <div class="panel-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>File</th><th>Direktori</th><th>Ukuran</th><th>Entri</th></tr></thead>
          <tbody id="stats-files-body">
            <tr><td colspan="4" style="text-align:center;padding:16px;color:#475569">Memuat...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: ERROR LOG
  ═══════════════════════════════════════════════════ -->
  <div id="section-errors" class="section content">
    <div class="section-title"><i class="fas fa-exclamation-triangle"></i> Error Log Laravel</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadErrors()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Level</label>
            <select id="err-level">
              <option value="all">Semua</option>
              <option value="ERROR">ERROR</option>
              <option value="WARNING">WARNING</option>
              <option value="INFO">INFO</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="err-search" placeholder="SQLSTATE, Exception, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-bug mr-2"></i>Laravel Error Log</h3><span class="badge" id="badge-err-count">0</span></div>
      </div>
      <div id="error-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       SECTION: CRYPTO TEST
  ═══════════════════════════════════════════════════ -->
  <div id="section-crypto-ops" class="section content">
    <div class="section-title"><i class="fas fa-lock"></i> Crypto Operations Test</div>
    <div class="info-box info-teal">
      <i class="fas fa-shield-alt"></i>
      Operasi kriptografi berjalan di Cloudflare Edge menggunakan Web Crypto API.
      Tidak ada proxy ke sandbox — semua operasi 100% edge-native.
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-clock mr-2"></i>Timestamp Jakarta</h3></div></div>
        <div class="panel-body">
          <button class="btn btn-primary" onclick="cryptoTest('timestamp')"><i class="fas fa-sync-alt"></i> Get Timestamp</button>
          <div id="result-timestamp" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-key mr-2"></i>Generate AES Keys</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID</label>
            <input type="text" id="cto-clientid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('keygen')"><i class="fas fa-cogs"></i> Generate Keys</button>
          <div id="result-keygen" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-fingerprint mr-2"></i>Encode X-CLIENT-ID</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID Raw</label>
            <input type="text" id="cto-did-cid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-did-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('did-encode')"><i class="fas fa-code"></i> Encode DID</button>
          <div id="result-did-encode" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-signature mr-2"></i>Generate Signature</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>AES CS (dari keygen)</label>
            <input type="text" id="cto-sig-cs" placeholder="EueZ6DfS18s="/>
          </div>
          <div class="field-row">
            <label>Client ID Encoded</label>
            <input type="text" id="cto-sig-cid" placeholder="U01ZU2V6G3C7CWtV..."/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('signature')"><i class="fas fa-pencil-alt"></i> Generate Sig</button>
          <div id="result-signature" style="margin-top:10px;display:none"></div>
        </div>
      </div>
    </div>
  </div>

</main>

<script>
/* ─────────────────────────────────────────────────────
   STATE & HELPERS
───────────────────────────────────────────────────── */
let hourlyChart = null, endpointChart = null, dailyChart = null;

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0,10);
}

function fmtTime(s) {
  // Extract timestamp from log entry text
  const m = s.match(/\\[(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})\\]/);
  return m ? m[1] : '—';
}

function extractEndpoint(text) {
  const m = text.match(/POST\\s+(https?:\\/\\/[^\\n]+)/);
  if (m) {
    const url = m[1].trim();
    const parts = url.split('/');
    return parts.slice(-3).join('/');
  }
  return '—';
}

function extractDataBody(text) {
  const m = text.match(/DATA:\\s*([\\s\\S]*?)(?=\\[\\d{4}|$)/);
  if (m && m[1].trim()) return m[1].trim();
  return '';
}

function escH(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name)?.classList.add('active');
  document.getElementById('nav-' + name)?.classList.add('active');
  const titles = {
    'dashboard': '<i class="fas fa-tachometer-alt mr-2"></i>Overview',
    'activity': '<i class="fas fa-chart-line mr-2"></i>Aktivitas Harian',
    'logs-access': '<i class="fas fa-sign-in-alt mr-2"></i>Log Akses Nasabah',
    'logs-transfer': '<i class="fas fa-exchange-alt mr-2"></i>Log Transfer',
    'logs-tabungan': '<i class="fas fa-piggy-bank mr-2"></i>Log Tabungan',
    'logs-token': '<i class="fas fa-key mr-2"></i>Log Token',
    'stats': '<i class="fas fa-chart-bar mr-2"></i>Statistik API',
    'errors': '<i class="fas fa-exclamation-triangle mr-2"></i>Error Log',
    'crypto-ops': '<i class="fas fa-lock mr-2"></i>Crypto Test',
  };
  document.getElementById('topbar-title').innerHTML = titles[name] || name;
  closeSidebar();
  return false;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

function updateClock() {
  const now = new Date();
  const wib = new Date(now.getTime() + 7*3600000);
  const ts = wib.toISOString().replace('T',' ').slice(0,19);
  document.getElementById('sidebar-time').textContent = ts + ' WIB';
  document.getElementById('topbar-date').textContent = ts + ' WIB';
}

/* ─────────────────────────────────────────────────────
   API CALLS
───────────────────────────────────────────────────── */
async function callAdmin(payload) {
  const r = await fetch('/api/admin', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

async function callCrypto(payload) {
  const r = await fetch('/api/crypto', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

/* ─────────────────────────────────────────────────────
   PARSE LOG ENTRIES
   Format: [YYYY-MM-DD HH:MM:SS] local.INFO: \\nREQUEST:\\n...
───────────────────────────────────────────────────── */
function parseLogEntries(text) {
  // Split on timestamp markers
  const chunks = text.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  return chunks.filter(c => c.trim().length > 5).map(chunk => {
    const ts = fmtTime(chunk);
    const endpoint = extractEndpoint(chunk);
    const data = extractDataBody(chunk);
    const isResponse = chunk.includes('RESPONSE');
    const isError = chunk.toLowerCase().includes('local.error') || chunk.toLowerCase().includes('exception');
    return { ts, endpoint, data, raw: chunk.trim(), isResponse, isError };
  });
}

function renderLogEntries(entries, containerId, searchText = '') {
  const el = document.getElementById(containerId);
  if (!entries || entries.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log ditemukan</div></div>';
    return 0;
  }
  const filtered = searchText
    ? entries.filter(e => e.raw.toLowerCase().includes(searchText.toLowerCase()))
    : entries;
  
  el.innerHTML = filtered.slice(0, 200).map((e, i) => {
    const method = e.raw.includes('POST ') ? '<span class="method-tag method-post">POST</span>' :
                   e.raw.includes('GET ') ? '<span class="method-tag method-get">GET</span>' : '';
    const typeTag = e.isResponse
      ? '<span class="badge-pill badge-info">RESPONSE</span>'
      : e.isError
        ? '<span class="badge-pill badge-err">ERROR</span>'
        : '<span class="badge-pill badge-ok">REQUEST</span>';
    const endpointShort = e.endpoint.length > 50 ? e.endpoint.slice(-50) : e.endpoint;
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
          \${method} \${typeTag}
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${e.ts}</span>
          <span style="font-size:11px;color:#7dd3fc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(endpointShort)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(e.raw)}</pre></div>
    </div>\`;
  }).join('');
  return filtered.length;
}

function toggleLog(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  body.classList.toggle('show');
  if (icon) {
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }
}

/* ─────────────────────────────────────────────────────
   DASHBOARD LOAD
───────────────────────────────────────────────────── */
async function loadDashboard() {
  const today = todayStr();

  // Load today's access log
  try {
    const accRes = await callAdmin({ op: 'read-log', path: \`access-\${today}.txt\`, dir: 'root' });
    if (accRes.ok && accRes.content) {
      const entries = parseLogEntries(accRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-access').textContent = entries.length;
      document.getElementById('stat-access-sub').textContent = 'Login/Logout hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-access').textContent = entries.length;
      document.getElementById('recent-access-body').innerHTML = recent.map(e =>
        \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
         <td><span class="badge-pill badge-ok">OK</span></td></tr>\`
      ).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    } else {
      document.getElementById('stat-total-access').textContent = '0';
      document.getElementById('stat-access-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-access').textContent = '?';
  }

  // Load today's transfer log
  try {
    const trRes = await callAdmin({ op: 'read-log', path: \`transfer-AB-\${today}.txt\`, dir: 'root' });
    if (trRes.ok && trRes.content) {
      const entries = parseLogEntries(trRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-transfer').textContent = entries.length;
      document.getElementById('stat-transfer-sub').textContent = 'Transfer LPD (AB) hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-transfer').textContent = entries.length;
      document.getElementById('recent-transfer-body').innerHTML = recent.map(e => {
        const body = e.data;
        const amtMatch = body.match(/"amount":"([^"]+)"/);
        return \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
               <td class="mono" style="font-size:10px">\${amtMatch ? '🔒 enc' : '—'}</td></tr>\`;
      }).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    } else {
      document.getElementById('stat-total-transfer').textContent = '0';
      document.getElementById('stat-transfer-sub').textContent = 'Belum ada log';
      document.getElementById('recent-transfer-body').innerHTML = '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">—</td></tr>';
    }
  } catch(e) {
    document.getElementById('stat-total-transfer').textContent = '?';
  }

  // Load today's token log
  try {
    const tokRes = await callAdmin({ op: 'read-log', path: \`token-\${today}.txt\`, dir: 'root' });
    if (tokRes.ok && tokRes.content) {
      const entries = parseLogEntries(tokRes.content);
      document.getElementById('stat-total-token').textContent = entries.length;
      document.getElementById('stat-token-sub').textContent = 'Token request hari ini';
    } else {
      document.getElementById('stat-total-token').textContent = '0';
      document.getElementById('stat-token-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-token').textContent = '?';
  }

  // Load log files overview
  try {
    const filesRes = await callAdmin({ op: 'list-logs' });
    if (filesRes.ok) {
      document.getElementById('stat-total-errors').textContent = filesRes.error_count || '—';
      document.getElementById('stat-error-sub').textContent = '7 hari terakhir';
      renderLogFilesOverview(filesRes.files);
    }
  } catch(e) {}
}

function renderLogFilesOverview(files) {
  if (!files || files.length === 0) return;
  const grouped = {};
  files.forEach(f => {
    const g = f.dir || 'root';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(f);
  });
  
  const html = Object.entries(grouped).map(([dir, flist]) => \`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:#0d6b65;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">
        <i class="fas fa-folder-open mr-1"></i> \${dir === 'root' ? 'storage/logs/' : 'storage/logs/' + dir + '/'}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        \${flist.slice(0,20).map(f => \`<span class="tag" title="\${f.name}">\${f.name}</span>\`).join('')}
        \${flist.length > 20 ? \`<span class="tag" style="color:#64748b">+\${flist.length-20} lainnya</span>\` : ''}
      </div>
    </div>
  \`).join('');
  document.getElementById('log-files-overview').innerHTML = html;
}

/* ─────────────────────────────────────────────────────
   ACTIVITY SECTION
───────────────────────────────────────────────────── */
async function loadActivity() {
  const date = document.getElementById('act-date').value || todayStr();
  const type = document.getElementById('act-type').value;
  const filter = document.getElementById('act-filter').value.toLowerCase();

  // Build filename
  let filename = '';
  let dir = 'root';
  if (type === 'access') { filename = \`access-\${date}.txt\`; }
  else if (type === 'transfer-AR') { filename = \`transfer-AR-\${date}.txt\`; }
  else if (type === 'transfer-AB') { filename = \`transfer-AB-\${date}.txt\`; }
  else if (type === 'tabungan') { filename = \`tabungan-\${date}.txt\`; }
  else if (type === 'token') { filename = \`token-\${date}.txt\`; }

  document.getElementById('activity-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span> Memuat...</div>';

  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i> \${res.error || 'File tidak ditemukan: ' + filename}</div>\`;
    document.getElementById('badge-act-total').textContent = '0';
    document.getElementById('badge-act-entries').textContent = '0';
    return;
  }

  const entries = parseLogEntries(res.content);
  const filtered = filter ? entries.filter(e => e.raw.toLowerCase().includes(filter)) : entries;
  document.getElementById('badge-act-total').textContent = filtered.length;
  document.getElementById('badge-act-entries').textContent = filtered.length;

  // Hourly chart
  const hourCounts = Array(24).fill(0);
  filtered.forEach(e => {
    const h = parseInt(e.ts.slice(11,13));
    if (!isNaN(h)) hourCounts[h]++;
  });
  renderHourlyChart(hourCounts);

  // Endpoint chart
  const epCount = {};
  filtered.forEach(e => {
    const ep = e.endpoint.split('/').slice(-1)[0] || 'unknown';
    epCount[ep] = (epCount[ep] || 0) + 1;
  });
  renderEndpointChart(epCount);

  // Log list
  const count = renderLogEntries(filtered, 'activity-log-list', '');
  if (filtered.length === 0) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log untuk \${filename}</div></div>\`;
  }
}

function renderHourlyChart(data) {
  const ctx = document.getElementById('chart-hourly').getContext('2d');
  if (hourlyChart) hourlyChart.destroy();
  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({length:24}, (_,i) => i+'h'),
      datasets: [{
        data,
        backgroundColor: 'rgba(20,184,166,.6)',
        borderColor: '#14b8a6',
        borderWidth: 1,
        borderRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

function renderEndpointChart(data) {
  const ctx = document.getElementById('chart-endpoint').getContext('2d');
  if (endpointChart) endpointChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,8);
  endpointChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sorted.map(e=>e[0]),
      datasets: [{ data: sorted.map(e=>e[1]),
        backgroundColor: ['#14b8a6','#a78bfa','#34d399','#fbbf24','#60a5fa','#f87171','#fb923c','#818cf8'],
        borderWidth: 1, borderColor: '#0f172a' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 9 }, boxWidth: 10, padding: 8 } } }
    }
  });
}

/* ─────────────────────────────────────────────────────
   ACCESS LOGS
───────────────────────────────────────────────────── */
async function loadAccessLogs() {
  const date = document.getElementById('acc-date').value || todayStr();
  const source = document.getElementById('acc-source').value;
  const search = document.getElementById('acc-search').value;
  
  let filename = \`access-\${date}.txt\`;
  let dir = source;
  if (source === 'his') { dir = 'his'; }

  document.getElementById('access-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('access-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-acc-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'access-log-list', search);
  document.getElementById('badge-acc-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TRANSFER LOGS
───────────────────────────────────────────────────── */
async function loadTransferLogs() {
  const date = document.getElementById('tr-date').value || todayStr();
  const type = document.getElementById('tr-type').value;
  const source = document.getElementById('tr-source').value;
  const search = document.getElementById('tr-search').value;
  
  let filename = '';
  if (type === 'AR') filename = \`transfer-AR-\${date}.txt\`;
  else if (type === 'AB') filename = \`transfer-AB-\${date}.txt\`;
  else filename = \`transfer-in-\${date}.txt\`;
  let dir = source;

  document.getElementById('transfer-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('transfer-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tr-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'transfer-log-list', search);
  document.getElementById('badge-tr-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TABUNGAN LOGS
───────────────────────────────────────────────────── */
async function loadTabunganLogs() {
  const date = document.getElementById('tab-date').value || todayStr();
  const search = document.getElementById('tab-search').value;
  const filename = \`tabungan-\${date}.txt\`;

  document.getElementById('tabungan-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir: 'root' });
  if (!res.ok) {
    document.getElementById('tabungan-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tab-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'tabungan-log-list', search);
  document.getElementById('badge-tab-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   TOKEN LOGS
───────────────────────────────────────────────────── */
async function loadTokenLogs() {
  const date = document.getElementById('tok-date').value || todayStr();
  const type = document.getElementById('tok-type').value;
  const search = document.getElementById('tok-search').value;
  
  let filename = '', dir = 'root';
  if (type === 'root') { filename = \`token-\${date}.txt\`; dir = 'root'; }
  else { filename = \`request-\${date}.log\`; dir = 'token'; }

  document.getElementById('token-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('token-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tok-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'token-log-list', search);
  document.getElementById('badge-tok-count').textContent = count;
}

/* ─────────────────────────────────────────────────────
   STATISTICS
───────────────────────────────────────────────────── */
async function loadStats() {
  document.getElementById('stats-files-body').innerHTML = '<tr><td colspan="4" style="text-align:center;padding:16px"><span class="spinner"></span></td></tr>';
  const res = await callAdmin({ op: 'list-logs' });
  if (!res.ok) return;
  
  // Files table
  const filesHtml = (res.files || []).map(f => \`
    <tr>
      <td class="mono">\${f.name}</td>
      <td><span class="tag">\${f.dir}</span></td>
      <td class="mono">\${f.size_kb ? f.size_kb + ' KB' : '—'}</td>
      <td><span class="badge-pill badge-info">\${f.entries || '—'}</span></td>
    </tr>
  \`).join('');
  document.getElementById('stats-files-body').innerHTML = filesHtml || '<tr><td colspan="4" style="text-align:center;color:#475569">Tidak ada file</td></tr>';

  // Endpoint stats
  if (res.endpoints) {
    const sorted = Object.entries(res.endpoints).sort((a,b)=>b[1]-a[1]).slice(0,15);
    const max = sorted[0]?.[1] || 1;
    document.getElementById('stats-endpoints').innerHTML = sorted.map(([ep, cnt]) => \`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11px">
        <div style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;color:#a5b4fc" title="\${ep}">\${ep}</div>
        <div style="background:#14b8a6;height:6px;border-radius:3px;width:\${Math.round(cnt/max*120)}px;flex-shrink:0"></div>
        <div style="color:#5eead4;font-weight:700;min-width:30px;text-align:right">\${cnt}</div>
      </div>
    \`).join('') || '<div style="color:#475569;text-align:center;padding:20px">Belum ada data</div>';
  }

  // Daily chart
  if (res.daily) renderDailyChart(res.daily);
}

function renderDailyChart(data) {
  const ctx = document.getElementById('chart-daily').getContext('2d');
  if (dailyChart) dailyChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>a[0].localeCompare(b[0])).slice(-30);
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(e=>e[0].slice(5)),
      datasets: [{
        data: sorted.map(e=>e[1]),
        borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,.1)',
        borderWidth: 2, pointRadius: 2, fill: true, tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 }, maxRotation: 45 }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

/* ─────────────────────────────────────────────────────
   ERROR LOGS
───────────────────────────────────────────────────── */
async function loadErrors() {
  const level = document.getElementById('err-level').value;
  const search = document.getElementById('err-search').value;

  document.getElementById('error-log-list').innerHTML = '<div style="text-align:center;padding:20px"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: 'laravel.log', dir: 'root' });
  if (!res.ok) {
    document.getElementById('error-log-list').innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> \${res.error || 'Gagal membaca laravel.log'}</div>\`;
    return;
  }

  // Parse laravel log blocks (each starts with [date])
  const raw = res.content || '';
  const blocks = raw.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  
  let filtered = blocks.filter(b => {
    if (!b.trim()) return false;
    if (level !== 'all' && !b.toLowerCase().includes('local.' + level.toLowerCase())) return false;
    if (search && !b.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  document.getElementById('badge-err-count').textContent = filtered.length;
  
  if (filtered.length === 0) {
    document.getElementById('error-log-list').innerHTML = '<div class="empty-state"><i class="fas fa-check-circle" style="color:#34d399"></i><div>Tidak ada error ditemukan</div></div>';
    return;
  }

  document.getElementById('error-log-list').innerHTML = filtered.slice(-100).reverse().map((block, i) => {
    const ts = fmtTime(block);
    const isErr = block.toLowerCase().includes('local.error');
    const isWarn = block.toLowerCase().includes('local.warning');
    const cls = isErr ? 'badge-err' : isWarn ? 'badge-warn' : 'badge-info';
    const levelText = isErr ? 'ERROR' : isWarn ? 'WARNING' : 'INFO';
    const preview = block.trim().slice(0,120).replace(/\\n/g,' ');
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
          <span class="badge-pill \${cls}">\${levelText}</span>
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${ts}</span>
          <span style="font-size:11px;color:#cbd5e1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(preview)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(block.trim())}</pre></div>
    </div>\`;
  }).join('');
}

/* ─────────────────────────────────────────────────────
   CRYPTO TEST
───────────────────────────────────────────────────── */
async function cryptoTest(op) {
  const resultId = 'result-' + op;
  const el = document.getElementById(resultId);
  el.style.display = 'block';
  el.innerHTML = '<span class="spinner"></span> Memproses...';
  
  let payload = { op };
  if (op === 'keygen') {
    payload.clientID = document.getElementById('cto-clientid').value;
    payload.timestamp = document.getElementById('cto-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.timestamps?.jakarta || '';
    }
  } else if (op === 'did-encode') {
    payload.clientID = document.getElementById('cto-did-cid').value;
    payload.timestamp = document.getElementById('cto-did-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.timestamps?.jakarta || '';
    }
  } else if (op === 'signature') {
    payload.aesCs = document.getElementById('cto-sig-cs').value;
    payload.clientIdEnc = document.getElementById('cto-sig-cid').value;
  }
  
  try {
    const res = await callCrypto(payload);
    el.innerHTML = \`<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:10px;font-size:11px;font-family:monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:200px;overflow-y:auto">\${JSON.stringify(res, null, 2)}</div>\`;
  } catch(e) {
    el.innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> Error: \${e.message}</div>\`;
  }
}

/* ─────────────────────────────────────────────────────
   REFRESH ALL
───────────────────────────────────────────────────── */
function refreshAll() {
  const active = document.querySelector('.section.active');
  if (active?.id === 'section-dashboard') loadDashboard();
  else if (active?.id === 'section-stats') loadStats();
  else if (active?.id === 'section-errors') loadErrors();
  else if (active?.id === 'section-activity') loadActivity();
  else if (active?.id === 'section-logs-access') loadAccessLogs();
  else if (active?.id === 'section-logs-transfer') loadTransferLogs();
  else if (active?.id === 'section-logs-tabungan') loadTabunganLogs();
  else if (active?.id === 'section-logs-token') loadTokenLogs();
}

/* ─────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // Set default dates
  const today = todayStr();
  ['act-date','acc-date','tr-date','tab-date','tok-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });
  
  updateClock();
  setInterval(updateClock, 10000);
  loadDashboard();
});
</script>
</body>
</html>`;
}
