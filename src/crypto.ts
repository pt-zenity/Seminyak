/**
 * LPD Seminyak — Crypto Toolkit HTML UI
 * Halaman interaktif untuk menjalankan semua operasi kriptografi
 */

export function getCryptoHTML(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak — Crypto Toolkit</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#7c3aed;--primary-dark:#5b21b6;--secondary:#0f172a;--sidebar-w:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#1e1b4b;overflow-y:auto;z-index:100;border-right:1px solid #312e81}
#sidebar .logo{padding:18px 16px 14px;background:linear-gradient(135deg,#4c1d95,#7c3aed);border-bottom:1px solid #4c1d95}
#sidebar .logo h1{font-size:15px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#c4b5fd;margin-top:3px}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#a5b4fc;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(139,92,246,.2);border-left-color:#7c3aed}
#sidebar nav a i{width:16px;text-align:center;font-size:13px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#4c1d95}
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#1e1b4b;border-bottom:1px solid #312e81;padding:12px 28px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:16px;font-weight:700;color:#c4b5fd}
.section{display:none}.section.active{display:block}
.content{padding:24px 28px}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;margin-bottom:20px;overflow:hidden}
.panel-header{padding:14px 18px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px}
.panel-header h3{font-size:13px;font-weight:700;color:#a78bfa}
.panel-header .badge{font-size:10px;padding:2px 8px;border-radius:999px;background:#312e81;color:#c4b5fd;font-weight:600}
.panel-body{padding:18px}
label{display:block;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=number],textarea,select{
  width:100%;background:#0f172a;border:1px solid #334155;border-radius:7px;
  padding:9px 12px;color:#e2e8f0;font-size:13px;font-family:'Courier New',monospace;
  outline:none;transition:border .15s;
}
input[type=text]:focus,input[type=number]:focus,textarea:focus,select:focus{border-color:#7c3aed}
textarea{resize:vertical;min-height:80px;line-height:1.5}
select{cursor:pointer}
.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#6d28d9,#5b21b6);transform:translateY(-1px)}
.btn-secondary{background:#334155;color:#94a3b8}
.btn-secondary:hover{background:#475569;color:#e2e8f0}
.btn-green{background:linear-gradient(135deg,#059669,#047857);color:#fff}
.btn-green:hover{background:linear-gradient(135deg,#047857,#065f46)}
.btn-orange{background:linear-gradient(135deg,#d97706,#b45309);color:#fff}
.btn-orange:hover{background:linear-gradient(135deg,#b45309,#92400e)}
.btn-red{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff}
.btn-red:hover{background:linear-gradient(135deg,#b91c1c,#991b1b)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.result-box{margin-top:14px;display:none}
.result-box.show{display:block}
.result-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.result-header span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.result-ok{color:#34d399}.result-err{color:#f87171}
pre.result{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:14px;font-size:11.5px;font-family:'Courier New',monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:400px;overflow-y:auto;line-height:1.6}
.copy-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;border-radius:5px;padding:3px 9px;font-size:10px;cursor:pointer;transition:all .15s}
.copy-btn:hover{background:#334155;color:#e2e8f0}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
@media(max-width:900px){.grid-2,.grid-3{grid-template-columns:1fr}}
.field-row{margin-bottom:12px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:1px;flex-shrink:0}
.info-purple{background:#1e1b4b;border-left:3px solid #7c3aed;color:#a5b4fc}
.info-green{background:#022c22;border-left:3px solid #059669;color:#6ee7b7}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.tab-bar{display:flex;gap:2px;border-bottom:1px solid #334155;margin-bottom:16px}
.tab{padding:8px 16px;font-size:12px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}
.tab.active{color:#a78bfa;border-bottom-color:#7c3aed}
.tab-panel{display:none}.tab-panel.active{display:block}
.stat-row{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1e293b;font-size:12px}
.stat-row:last-child{border-bottom:none}
.stat-key{color:#64748b;min-width:130px;font-family:monospace}
.stat-val{color:#a5f3fc;font-family:monospace;word-break:break-all}
.divider{height:1px;background:#1e293b;margin:16px 0}
.quick-ref{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;font-family:monospace;color:#64748b;line-height:2}
.quick-ref .cmd{color:#a5f3fc}
.quick-ref .comment{color:#475569}
.badge-algo{display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700}
.badge-aes{background:#1e3a5f;color:#60a5fa}
.badge-hmac{background:#1c1200;color:#fcd34d}
.badge-rsa{background:#1e1b4b;color:#a78bfa}
.badge-sha{background:#022c22;color:#6ee7b7}
.nav-back{padding:10px 14px;border-top:1px solid #312e81;position:sticky;bottom:0;background:#1e1b4b}
</style>
</head>
<body>

<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-lock mr-1"></i> LPD Crypto Toolkit</h1>
  <p>AES-256-CBC · RSA · HMAC-SHA512</p>
</div>
<nav>
  <div class="nav-section">Kunci &amp; Token</div>
  <a href="#" onclick="showTab('keygen');return false" id="nav-keygen" class="active"><i class="fas fa-key"></i> Derive AES Keys</a>
  <a href="#" onclick="showTab('timestamp');return false" id="nav-timestamp"><i class="fas fa-clock"></i> Timestamp Jakarta</a>
  <a href="#" onclick="showTab('reference');return false" id="nav-reference"><i class="fas fa-hashtag"></i> Generate X-REFERENCE</a>
  <div class="nav-section">Enkripsi &amp; Dekripsi</div>
  <a href="#" onclick="showTab('encrypt');return false" id="nav-encrypt"><i class="fas fa-lock"></i> AES Encrypt</a>
  <a href="#" onclick="showTab('decrypt');return false" id="nav-decrypt"><i class="fas fa-unlock"></i> AES Decrypt</a>
  <a href="#" onclick="showTab('decrypt-body');return false" id="nav-decrypt-body"><i class="fas fa-box-open"></i> Decrypt Request Body</a>
  <div class="nav-section">Header Decode/Encode</div>
  <a href="#" onclick="showTab('did-decode');return false" id="nav-did-decode"><i class="fas fa-id-card"></i> Decode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('did-encode');return false" id="nav-did-encode"><i class="fas fa-id-badge"></i> Encode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('jwt-decode');return false" id="nav-jwt-decode"><i class="fas fa-file-code"></i> Decode JWT</a>
  <a href="#" onclick="showTab('sig-decode');return false" id="nav-sig-decode"><i class="fas fa-signature"></i> Decode X-SIGNATURE</a>
  <div class="nav-section">Generate Signature</div>
  <a href="#" onclick="showTab('signature');return false" id="nav-signature"><i class="fas fa-pen-nib"></i> X-SIGNATURE / PARTNER-ID</a>
  <a href="#" onclick="showTab('ios-token-sig');return false" id="nav-ios-token-sig"><i class="fas fa-mobile-alt"></i> iOS Token Signature</a>
  <a href="#" onclick="showTab('snap-token-sig');return false" id="nav-snap-token-sig"><i class="fas fa-plug"></i> SNAP Token Signature</a>
  <div class="nav-section">Hash &amp; Builder</div>
  <a href="#" onclick="showTab('hashcode');return false" id="nav-hashcode"><i class="fas fa-fingerprint"></i> Hash Code Transfer</a>
  <a href="#" onclick="showTab('build-transfer');return false" id="nav-build-transfer"><i class="fas fa-hammer"></i> Build Transfer Request</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showTab('quick-ref');return false" id="nav-quick-ref"><i class="fas fa-book"></i> Referensi Cepat</a>
</nav>
<div class="nav-back">
  <a href="/swagger" style="display:flex;align-items:center;gap:7px;font-size:11px;color:#6d28d9;text-decoration:none"><i class="fas fa-flask"></i> Buka API Explorer</a>
</div>
</aside>

<div id="main">
<div class="topbar">
  <h2><i class="fas fa-lock mr-2"></i>LPD Seminyak — Crypto Toolkit</h2>
  <div style="display:flex;gap:6px">
    <span style="background:#312e81;color:#a5b4fc;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">AES-256-CBC</span>
    <span style="background:#1c1200;color:#fcd34d;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">HMAC-SHA512</span>
    <span style="background:#022c22;color:#6ee7b7;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">RSA-SHA256</span>
  </div>
</div>

<div class="content">

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DERIVE AES KEYS -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-keygen" class="section active">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-key" style="color:#a78bfa"></i>
    <h3>Derive AES Keys (Gio_CreateKeyAndIv)</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Menderivasi AES key, IV, dan CS dari <b>clientID</b> + <b>timestamp</b>. Replika tepat dari PHP <code>Gio_CreateKeyAndIv($clientID, $timeStamp)</code>. Digunakan pada saat registrasi perangkat baru (bukan DB lookup).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="kg-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="kg-ts" placeholder="2026-04-20 11:44:20" value="2026-04-20 11:44:20"/>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('keygen')"><i class="fas fa-play"></i> Derive Keys</button>
      <button class="btn btn-secondary" onclick="fillNow('kg-ts')"><i class="fas fa-clock"></i> Sekarang (Jakarta)</button>
    </div>
    <div id="result-keygen" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-info-circle"></i>
      <div><b>Cara kerja:</b> HMAC-SHA512(key=timestamp, msg=clientID) → 64 bytes → slice ke-HH:MM:SS untuk dapat key/iv/cs. AES Key = 32 bytes, IV = 16 bytes, CS = 8 bytes.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "AQ3A.240912.001.01102025120205" "2026-04-20 11:44:20"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- TIMESTAMP -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-timestamp" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-clock" style="color:#a78bfa"></i>
    <h3>Timestamp Jakarta (WIB UTC+7)</h3>
    <span class="badge">Utility</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Menghasilkan timestamp waktu Jakarta sekarang dalam dua format: <b>YYYY-MM-DD HH:MM:SS</b> (untuk iOS API) dan <b>ISO8601+07:00</b> (untuk SNAP API).</div>
    </div>
    <button class="btn btn-green" onclick="runOp('timestamp')"><i class="fas fa-sync"></i> Get Timestamp Sekarang</button>
    <div id="result-timestamp" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Format iOS (gmob_request, X-TIMESTAMP field):</span><br>
      <span class="cmd">2026-04-20 11:44:20</span><br>
      <span class="comment"># Format SNAP (ISO8601 dengan offset):</span><br>
      <span class="cmd">2026-04-20T11:44:20+07:00</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- REFERENCE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-reference" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hashtag" style="color:#a78bfa"></i>
    <h3>Generate X-REFERENCE</h3>
    <span class="badge">Unique ID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate nomor referensi unik format <b>SMYHHMMSSxxxxO1012YYYYMMDD</b>. Setiap request transfer membutuhkan X-REFERENCE yang belum pernah digunakan (status 45 = duplikat).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Prefix (default: SMY)</label>
        <input type="text" id="ref-prefix" placeholder="SMY" value="SMY"/>
      </div>
      <div class="field-row">
        <label>Jumlah (1–10)</label>
        <input type="number" id="ref-count" placeholder="5" value="5" min="1" max="10"/>
      </div>
    </div>
    <button class="btn btn-primary" onclick="runOp('reference')"><i class="fas fa-random"></i> Generate References</button>
    <div id="result-reference" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-red">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Penting:</b> Setiap X-REFERENCE hanya bisa digunakan SATU KALI per endpoint. Jika server mengembalikan status 45 ("No. referensi duplikat"), generate reference baru.</div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- AES ENCRYPT -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-encrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-lock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Encrypt (Gio_Encrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Enkripsi plaintext dengan AES-256-CBC. Replika dari PHP <code>openssl_encrypt($plain,'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>. Gunakan key/iv dari hasil Derive AES Keys.</div>
    </div>
    <div class="field-row">
      <label>Plaintext</label>
      <input type="text" id="enc-plain" placeholder="1234567890"/>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="enc-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="enc-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" onclick="runOp('encrypt')"><i class="fas fa-lock"></i> Encrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('enc-key','enc-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-encrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- AES DECRYPT -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-decrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-unlock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Decrypt (Gio_Decrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekripsi ciphertext base64 kembali ke plaintext. Replika dari PHP <code>openssl_decrypt(base64_decode($enc),'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>.</div>
    </div>
    <div class="field-row">
      <label>Ciphertext (base64)</label>
      <textarea id="dec-cipher" placeholder="RKtZRW+Abxp/HBPMeBzAMw=="></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="dec-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="dec-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-orange" onclick="runOp('decrypt')"><i class="fas fa-unlock"></i> Decrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('dec-key','dec-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-decrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "&lt;cipher_b64&gt;" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DECRYPT REQUEST BODY -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-decrypt-body" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-box-open" style="color:#a78bfa"></i>
    <h3>Decrypt Full Request Body</h3>
    <span class="badge">Batch Decrypt</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-yellow">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Catatan:</b> Body field (from_acc, to_acc, dst) hanya bisa didekripsi jika AES key/IV-nya SAMA dengan yang digunakan saat enkripsi (dari DB atau Gio_CreateKeyAndIv). Data dari curl real membutuhkan AES key dari tabel gmob_nasabah di database.</div>
    </div>
    <div class="field-row">
      <label>Body JSON (field-field yang terenkripsi)</label>
      <textarea id="db-body" style="min-height:160px;font-size:11px" placeholder='{"from_acc":"5re0Z89b0k2cwoL+K1HeRQ==","to_acc":"AvYW9eJG...","amount":"rJTs...","date_time":"SRcf...","to_name":"q7fp...","hash_code":"3MNi...","remark":""}'></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="db-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="db-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-orange" onclick="runOp('decrypt-body')"><i class="fas fa-box-open"></i> Decrypt Body</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('db-key','db-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
      <button class="btn btn-secondary" onclick="fillSampleBody()"><i class="fas fa-fill"></i> Contoh dari curl Real</button>
    </div>
    <div id="result-decrypt-body" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DID DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-did-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-card" style="color:#a78bfa"></i>
    <h3>Decode X-CLIENT-ID (Gio_DecryptDID)</h3>
    <span class="badge">DID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekode header <b>X-CLIENT-ID</b> menjadi <code>app|clientID|timestamp</code>. Algoritma custom: ekstrak 3 segmen base64 dari posisi tersembunyi, decode, split oleh "|".</div>
    </div>
    <div class="field-row">
      <label>X-CLIENT-ID (encoded DID, biasanya 400–600 karakter)</label>
      <textarea id="did-decode-val" style="min-height:100px;font-size:10px" placeholder="U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8..."></textarea>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('did-decode')"><i class="fas fa-unlock-alt"></i> Decode DID</button>
      <button class="btn btn-secondary" onclick="fillSampleDID()"><i class="fas fa-fill"></i> Contoh DID Real</button>
    </div>
    <div id="result-did-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs did "&lt;X-CLIENT-ID&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DID ENCODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-did-encode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-badge" style="color:#a78bfa"></i>
    <h3>Encode X-CLIENT-ID (kebalikan DID)</h3>
    <span class="badge">DID Encode</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Buat X-CLIENT-ID dari clientID + timestamp. Berguna untuk simulasi request dari perangkat baru.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="die-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="die-ts" placeholder="2026-04-21 10:30:00"/>
      </div>
    </div>
    <div class="field-row">
      <label>App Name (default: Seminyak)</label>
      <input type="text" id="die-app" placeholder="Seminyak" value="Seminyak"/>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-green" onclick="runOp('did-encode')"><i class="fas fa-lock"></i> Encode DID</button>
      <button class="btn btn-secondary" onclick="fillNow('die-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-did-encode" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- JWT DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-jwt-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-file-code" style="color:#a78bfa"></i>
    <h3>Decode JWT (Authorization header)</h3>
    <span class="badge">JWT RS256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode JWT Authorization header. Format custom LPD: header berisi <code>trans_no</code> + <code>alg:RS256</code>; payload berisi <code>trans_time</code>. Dibuat oleh lamanuna.biz.id Get_Token.</div>
    </div>
    <div class="field-row">
      <label>JWT Token (Authorization header value)</label>
      <textarea id="jwt-val" style="min-height:100px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0..."></textarea>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('jwt-decode')"><i class="fas fa-decode"></i> Decode JWT</button>
      <button class="btn btn-secondary" onclick="fillSampleJWT()"><i class="fas fa-fill"></i> Contoh JWT Real</button>
    </div>
    <div id="result-jwt-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "&lt;token&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SIG DECODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-sig-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-signature" style="color:#a78bfa"></i>
    <h3>Decode X-SIGNATURE / X-PARTNER-ID</h3>
    <span class="badge">base64 → hex</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode X-SIGNATURE atau X-PARTNER-ID dari base64 ke hex. Keduanya menggunakan formula yang sama: <code>base64(HMAC-SHA512(token:timestamp, aes_cs))</code>.</div>
    </div>
    <div class="field-row">
      <label>X-SIGNATURE atau X-PARTNER-ID (base64)</label>
      <textarea id="sigd-val" placeholder="N2E2Y2VhNGNlZDgyYWQ3NT..."></textarea>
    </div>
    <button class="btn btn-primary" onclick="runOp('sig-decode')"><i class="fas fa-search"></i> Decode Signature</button>
    <div id="result-sig-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "&lt;base64_signature&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SIGNATURE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-signature" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-pen-nib" style="color:#a78bfa"></i>
    <h3>Generate X-SIGNATURE &amp; X-PARTNER-ID</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE dan X-PARTNER-ID. Formula: <code>base64(HMAC-SHA512(token + ":" + timestamp, aes_cs))</code>. Keduanya menghasilkan nilai yang SAMA jika menggunakan aes_cs yang sama.</div>
    </div>
    <div class="field-row">
      <label>Authorization Token (JWT)</label>
      <textarea id="sig-token" style="min-height:80px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6..."></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-TIMESTAMP (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="sig-ts" placeholder="2026-04-20 11:44:20"/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, 8 bytes)</label>
        <input type="text" id="sig-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('signature')"><i class="fas fa-pen"></i> Generate Signature</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygenCS('sig-cs');pasteFromKeygenTS('sig-ts')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-signature" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula:</span><br>
      <span class="cmd">base64( HMAC-SHA512( token + ":" + timestamp, aes_cs ) )</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- iOS TOKEN SIG -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-ios-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-mobile-alt" style="color:#a78bfa"></i>
    <h3>iOS Token Signature (iosTokenCtrl)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/smart/access/token</code>. Formula: <code>RSA-SHA256(SHA256("Seminyak|" + timestamp))</code> menggunakan <b>private_key_lpd.pem</b>.</div>
    </div>
    <div class="field-row">
      <label>Timestamp (YYYY-MM-DD HH:MM:SS) — kosongkan untuk otomatis</label>
      <input type="text" id="ios-ts" placeholder="Kosongkan untuk timestamp sekarang (Jakarta)"/>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" onclick="runOp('ios-token-sig')"><i class="fas fa-mobile-alt"></i> Generate iOS Sig</button>
      <button class="btn btn-secondary" onclick="fillNow('ios-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-ios-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula PHP (iosTokenCtrl.php):</span><br>
      <span class="cmd">$clientStamp = hash("sha256", "Seminyak|" . $timeStamp);</span><br>
      <span class="cmd">openssl_sign($clientStamp, $sig, $privateKey);</span><br>
      <span class="cmd">base64_encode($sig);</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SNAP TOKEN SIG -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-snap-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-plug" style="color:#a78bfa"></i>
    <h3>SNAP Token Signature (BPD)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/v1.0/access-token/b2b</code>. Formula: <code>RSA-SHA256(clientKey + "|" + timestamp)</code> menggunakan <b>private_bpd_003.pem</b>.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-CLIENT-KEY</label>
        <input type="text" id="snap-key" placeholder="LPD-SEMINYAK-001" value="LPD-SEMINYAK-001"/>
      </div>
      <div class="field-row">
        <label>Timestamp ISO8601 — kosongkan untuk otomatis</label>
        <input type="text" id="snap-ts" placeholder="2026-04-21T10:30:00+07:00"/>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('snap-token-sig')"><i class="fas fa-plug"></i> Generate SNAP Sig</button>
      <button class="btn btn-secondary" onclick="fillNowISO('snap-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-snap-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula SNAP BPD:</span><br>
      <span class="cmd">message = clientKey + "|" + timestamp</span><br>
      <span class="cmd">RSA-SHA256(message, private_bpd_003.pem)</span><br>
      <span class="cmd">base64_encode(signature)</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- HASHCODE -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-hashcode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-fingerprint" style="color:#a78bfa"></i>
    <h3>Hash Code Transfer</h3>
    <span class="badge">SHA-256</span>
  </div>
  <div class="panel-body">
    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab('hash','check')">Check/Inquiry</div>
      <div class="tab" onclick="switchSubTab('hash','posting')">Posting</div>
      <div class="tab" onclick="switchSubTab('hash','lpd')">LPD Internal</div>
    </div>
    <div id="hash-check" class="tab-panel active">
      <div class="info-box info-purple">
        <i class="fas fa-info-circle"></i>
        <div>Formula Check/Inquiry: <code>SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|"+BPD_HASHCODE+"%")</code></div>
      </div>
    </div>
    <div id="hash-posting" class="tab-panel">
      <div class="info-box info-yellow">
        <i class="fas fa-info-circle"></i>
        <div>Formula Posting: <code>SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")"+BPD_HASHCODE+"@")</code></div>
      </div>
    </div>
    <div id="hash-lpd" class="tab-panel">
      <div class="info-box info-green">
        <i class="fas fa-info-circle"></i>
        <div>Formula LPD Internal: <code>SHA256("{"+nominal+"*"+norekFrom+"^"+norekTo+"%"+nameFrom+"#"+nameTo+"@"+BPD_HASHCODE+"}")</code></div>
      </div>
    </div>
    <input type="hidden" id="hash-step" value="check"/>

    <div id="hash-fields-transfer">
      <div class="grid-2">
        <div class="field-row">
          <label>From Account (Rek. Asal)</label>
          <input type="text" id="hc-from" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Amount (Nominal)</label>
          <input type="text" id="hc-amount" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Date Time (YYYY-MM-DD HH:MM:SS)</label>
          <input type="text" id="hc-dt" placeholder="2026-04-20 11:44:20"/>
        </div>
        <div class="field-row">
          <label>Reference No (X-REFERENCE)</label>
          <input type="text" id="hc-ref" placeholder="SMY0444582O10120422"/>
        </div>
        <div class="field-row">
          <label>Dest Bank Code</label>
          <input type="text" id="hc-bank" placeholder="014"/>
        </div>
        <div class="field-row">
          <label>Dest Account</label>
          <input type="text" id="hc-acc" placeholder="0987654321"/>
        </div>
      </div>
      <div class="field-row" id="hash-field-destname">
        <label>Dest Name (Nama Penerima) — diperlukan untuk Posting</label>
        <input type="text" id="hc-name" placeholder="I MADE BUDI SANTOSA"/>
      </div>
    </div>

    <div id="hash-fields-lpd" style="display:none">
      <div class="grid-2">
        <div class="field-row">
          <label>Nominal</label>
          <input type="text" id="hc-nominal" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Norek From</label>
          <input type="text" id="hc-nfrom" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Norek To</label>
          <input type="text" id="hc-nto" placeholder="0987654321"/>
        </div>
        <div class="field-row">
          <label>Name From</label>
          <input type="text" id="hc-nfromname" placeholder="I WAYAN SARI"/>
        </div>
      </div>
      <div class="field-row">
        <label>Name To</label>
        <input type="text" id="hc-ntoname" placeholder="I MADE BUDI"/>
      </div>
    </div>

    <button class="btn btn-primary" onclick="runOp('hashcode')"><i class="fas fa-fingerprint"></i> Generate Hash Code</button>
    <div id="result-hashcode" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-lock"></i>
      <div>BPD_HASHCODE = <b>p91wrswK</b> (dari .env production). Hash code ini kemudian di-encrypt dengan AES sebelum dikirim di body request.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode &lt;fromAcc&gt; &lt;amount&gt; &lt;dateTime&gt; &lt;refNo&gt; &lt;destBank&gt; &lt;destAcc&gt; &lt;destName&gt;</span>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- BUILD TRANSFER REQUEST -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-build-transfer" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hammer" style="color:#a78bfa"></i>
    <h3>Build Transfer Bank Request (Lengkap)</h3>
    <span class="badge">Full Builder</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Build request lengkap untuk <code>/api/smart/transfer/bank/check</code> atau <code>/post</code> atau <code>/inquiry</code>. Menghasilkan semua header + body terenkripsi + curl command siap pakai.</div>
    </div>

    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab('bt','check')">Check</div>
      <div class="tab" onclick="switchSubTab('bt','inquiry')">Inquiry</div>
      <div class="tab" onclick="switchSubTab('bt','posting')">Posting</div>
    </div>
    <input type="hidden" id="bt-step" value="check"/>

    <div class="grid-2">
      <div class="field-row">
        <label>Base URL</label>
        <input type="text" id="bt-url" value="https://lpdseminyak.biz.id:8000"/>
      </div>
      <div class="field-row">
        <label>Authorization (JWT Token)</label>
        <input type="text" id="bt-token" placeholder="eyJ0cmFuc19ubyI6..."/>
      </div>
      <div class="field-row">
        <label>X-CLIENT-ID (encoded DID)</label>
        <input type="text" id="bt-did" placeholder="U01ZU2V6F3B7B..."/>
      </div>
      <div class="field-row">
        <label>AES Key (base64)</label>
        <input type="text" id="bt-key" placeholder="6mFbbiR/..."/>
      </div>
      <div class="field-row">
        <label>AES IV (base64)</label>
        <input type="text" id="bt-iv" placeholder="ZLrWcBiR..."/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, untuk X-SIGNATURE)</label>
        <input type="text" id="bt-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
      <div class="field-row">
        <label>From Account</label>
        <input type="text" id="bt-from" placeholder="1234567890"/>
      </div>
      <div class="field-row">
        <label>Amount</label>
        <input type="text" id="bt-amount" placeholder="500000"/>
      </div>
      <div class="field-row">
        <label>Dest Bank Code</label>
        <input type="text" id="bt-dbank" placeholder="014"/>
      </div>
      <div class="field-row">
        <label>Dest Account</label>
        <input type="text" id="bt-dacc" placeholder="0987654321"/>
      </div>
      <div class="field-row">
        <label>Dest Name</label>
        <input type="text" id="bt-dname" placeholder="I MADE BUDI SANTOSA"/>
      </div>
      <div class="field-row">
        <label>Date Time (kosong = otomatis)</label>
        <input type="text" id="bt-dt" placeholder="Otomatis timestamp Jakarta"/>
      </div>
    </div>
    <div class="field-row">
      <label>X-REFERENCE (kosong = generate otomatis)</label>
      <input type="text" id="bt-ref" placeholder="Generate otomatis (SMY...)"/>
    </div>

    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="runOp('build-transfer')"><i class="fas fa-hammer"></i> Build Request</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('bt-key','bt-iv');pasteFromKeygenCS('bt-cs')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-build-transfer" class="result-box"></div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- QUICK REF -->
<!-- ═══════════════════════════════════════════════════════════ -->
<section id="tab-quick-ref" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-book" style="color:#a78bfa"></i>
    <h3>Referensi Cepat</h3>
  </div>
  <div class="panel-body">
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Konstanta dari .env</h4>
    <div class="stat-row"><div class="stat-key">BPD_HASHCODE</div><div class="stat-val">p91wrswK</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_SECRET</div><div class="stat-val">7vCjkNHs</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_VA</div><div class="stat-val">VA-325</div></div>
    <div class="stat-row"><div class="stat-key">WHITELIST_IP</div><div class="stat-val">34.50.74.78</div></div>
    <div class="stat-row"><div class="stat-key">BPD_PREFIX</div><div class="stat-val">989191</div></div>
    <div class="stat-row"><div class="stat-key">X-CLIENT-KEY (SNAP)</div><div class="stat-val">LPD-SEMINYAK-001</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Algoritma Enkripsi per Komponen</h4>
    <div class="stat-row"><div class="stat-key">Body fields</div><div class="stat-val"><span class="badge-algo badge-aes">AES-256-CBC</span> key/iv dari DB atau Gio_CreateKeyAndIv</div></div>
    <div class="stat-row"><div class="stat-key">X-SIGNATURE</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> base64(HMAC(token:ts, aes_cs))</div></div>
    <div class="stat-row"><div class="stat-key">X-PARTNER-ID</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> sama dengan X-SIGNATURE</div></div>
    <div class="stat-row"><div class="stat-key">hash_code (transfer)</div><div class="stat-val"><span class="badge-algo badge-sha">SHA-256</span> string dengan separators khusus</div></div>
    <div class="stat-row"><div class="stat-key">iOS token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(SHA256("Seminyak|ts"), priv_lpd)</div></div>
    <div class="stat-row"><div class="stat-key">SNAP token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(clientKey+"|"+ts, priv_bpd)</div></div>
    <div class="stat-row"><div class="stat-key">AES Key derivation</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> key=ts, msg=clientID → 64 bytes → slice</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">CLI Commands</h4>
    <div class="quick-ref" style="line-height:2.2">
      <span class="cmd">node lpd-crypto.cjs demo</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "clientID" "timestamp"</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "cipher_b64" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs did "X-CLIENT-ID"</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "JWT_token"</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "X-SIGNATURE_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode from amount datetime ref bank acc name</span><br>
      <span class="cmd">node lpd-crypto.cjs ref SMY</span>
    </div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">File Keys</h4>
    <div class="stat-row"><div class="stat-key">private_bpd_003.pem</div><div class="stat-val">Private key SNAP BPD Bali (untuk X-SIGNATURE SNAP)</div></div>
    <div class="stat-row"><div class="stat-key">private_key_lpd.pem</div><div class="stat-val">Private key LPD Seminyak (untuk iOS token sig)</div></div>
    <div class="stat-row"><div class="stat-key">keys/public_key.pem</div><div class="stat-val">Public key client (diterima server untuk verifikasi iOS)</div></div>
    <div class="stat-row"><div class="stat-key">public_key_bpd.pem</div><div class="stat-val">Public key BPD (untuk verifikasi SNAP token)</div></div>
  </div>
</div>
</section>

</div><!-- .content -->
</div><!-- #main -->

<script>
// ── State ─────────────────────────────────────────────────────────────────────
let lastKeygen = null;

// ── Navigation ────────────────────────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(a => a.classList.remove('active'));
  const sec = document.getElementById('tab-' + name);
  if (sec) sec.classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
}

function switchSubTab(group, tab) {
  document.querySelectorAll('#tab-' + (group === 'hash' ? 'hashcode' : 'build-transfer') + ' .tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#tab-' + (group === 'hash' ? 'hashcode' : 'build-transfer') + ' .tab-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  const panel = document.getElementById(group + '-' + tab);
  if (panel) panel.classList.add('active');
  if (group === 'hash') {
    document.getElementById('hash-step').value = tab;
    const isLPD = tab === 'lpd';
    document.getElementById('hash-fields-transfer').style.display = isLPD ? 'none' : '';
    document.getElementById('hash-fields-lpd').style.display = isLPD ? '' : 'none';
  } else if (group === 'bt') {
    document.getElementById('bt-step').value = tab;
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────
async function callCrypto(payload) {
  const resp = await fetch('/api/crypto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showResult(id, data, isOk) {
  const box = document.getElementById('result-' + id);
  box.className = 'result-box show';
  const statusClass = isOk ? 'result-ok' : 'result-err';
  const icon = isOk ? '\u2705' : '\u274c';
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const safeId = 'rv_' + Math.random().toString(36).slice(2);
  window[safeId] = text;
  box.innerHTML = '<div class="result-header">' +
    '<span class="' + statusClass + '">' + icon + ' ' + (isOk ? 'Berhasil' : 'Gagal') + '</span>' +
    '<button class="copy-btn" onclick="copyText(this,window.'+safeId+')"><i class=\"fas fa-copy\"></i> Salin</button>' +
    '</div><pre class="result">' + escHtml(text) + '</pre>';
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function copyText(btn, text) {
  try {
    await navigator.clipboard.writeText(text);
    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Salin'; }, 1500);
  } catch(e) { alert('Gagal salin: ' + e.message); }
}

function setLoading(btn, loading) {
  if (loading) {
    btn._orig = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Proses...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn._orig || 'Run';
    btn.disabled = false;
  }
}

// ── Fill helpers ──────────────────────────────────────────────────────────────
async function fillNow(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakarta;
}
async function fillNowISO(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakartaISO;
}

function pasteFromKeygen(keyId, ivId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (keyId) document.getElementById(keyId).value = lastKeygen.aesKey;
  if (ivId) document.getElementById(ivId).value = lastKeygen.aesIv;
}
function pasteFromKeygenCS(csId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (csId) document.getElementById(csId).value = lastKeygen.aesCs;
}
function pasteFromKeygenTS(tsId) {
  // just fill current time
  fillNow(tsId);
}

function fillSampleDID() {
  document.getElementById('did-decode-val').value = 'U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8QVEzQS4yNDA5MTIXdJREV4T2pRME9qSXc4IT5RVkV6VVM0eU5EQTVNuMDAxLjAxMTAyXhNVEF5MURJMU1USXdNakExZkZOMDI1MTIwMjA1fDIwMjYtMDQtMjAgMTE6NDQ6MjAORFE2TWpBKCEpUTI5d2VYSnBaMmgwSU1LcElESXdNallnVUZRZ1IybHZjMjltZENCVGJXRnlkSEJ5YnlCSmJtUnZibVZ6YVdFZ0NsWmxjbk5wYjI0Z01TNHhMakY0TWpBeU5pMHdOQzB5TUNBeE1UbzBORG95TUh4QlVUTkJMakkwTURreE1pNHdNREV1TURFeE1ESXdNalV4TWpBeU1EVXkhXUNvcHlyaWdodCDCqSAyMDI2IFBUIEdpb3NvZnQgU21hcnRwcm8gSW5kb25lc2lhIApWZXJzaW9uIDEuMS4x=';
}

function fillSampleJWT() {
  document.getElementById('jwt-val').value = 'eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0LTIwMTAyLTI2ODc2IiwiYWxnIjoiUlMyNTYifQ.eyJ0cmFuc190aW1lIjoiMjAyNi0wNC0yMFQxMTo0MzoyMCswODowMCJ9.Hi4em1vt9TI-XcaWXjr4pZPdr1_8K8lNO3I5SAWOTvZoA2c-ILo-8LasRawWaUMwVVhDLFmLBofvGCLnyI4MKuOMpMpS8PRN9v7-UPc-htnglJkC4o9TDPb9qEHOU3QReAn0jROlEK5V0ThZdGLGF-Ma0bffC_IUUFtl7rzq-CpWArJF6GkH6KJNAbYgfp64On_QjGkOuhFN6qB7t5uEU_dAC-INRiiMeKZilJnSE7DcEOR-3DChdsxo6wbrL8PLHDQdHQeG-4NOPgg13JUsWzVgZFn24v0-Kk_mxgBTJ_jhY9ioCfAI7Z5VourvGsdLAYtLAcpC3NR7mZlJHp_vyQ';
}

function fillSampleBody() {
  document.getElementById('db-body').value = JSON.stringify({
    from_acc:  '5re0Z89b0k2cwoL+K1HeRQ==',
    to_acc:    'AvYW9eJGgNn7ekcnO3rcVcZEU76bgksWwQMjYKgHwptVxBFQWKyxVjM7AULzMEI6stJoXOrq+oYe0ZOx1V31jeVSWNA+9ufZtGabdKHw+aVJTUtmj4yxkMH8dQXfe4CeOLFmbnPtVSA0P43ThtPd3gKhAhz1IZ75urnc9xpsHCA=',
    amount:    'rJTsdtV8mD+Ogo2Ize6Y3g==',
    date_time: 'SRcf8pIUGi2A4D3bRlZZX8oXtNtIe3E7T1rRncMBaCc=',
    to_name:   'q7fpK0JWVKPz2ZWqxXnt5A==',
    hash_code: '3MNidoAhRMGSsi02xjJY+J1uYWhj6VDxMzHYzUwwSsUTE6v40k+jnpED0wN3m7WULe7hwqh++m0zzUt1Dt/0gMAxRQoOwz+DCUV4GJa7uyw=',
    remark: ''
  }, null, 2);
}

// ── Main op dispatcher ────────────────────────────────────────────────────────
async function runOp(opName) {
  const btn = event.currentTarget;
  setLoading(btn, true);
  try {
    let payload = { op: opName };

    if (opName === 'keygen') {
      payload.clientID  = val('kg-clientid');
      payload.timestamp = val('kg-ts');
    } else if (opName === 'encrypt') {
      payload.plaintext = val('enc-plain');
      payload.aesKey    = val('enc-key');
      payload.aesIv     = val('enc-iv');
    } else if (opName === 'decrypt') {
      payload.ciphertext = val('dec-cipher');
      payload.aesKey     = val('dec-key');
      payload.aesIv      = val('dec-iv');
    } else if (opName === 'decrypt-body') {
      payload.op = 'decrypt-body';
      try {
        payload.body = JSON.parse(val('db-body') || '{}');
      } catch(e) {
        showResult('decrypt-body', 'Body JSON tidak valid: ' + e.message, false);
        return;
      }
      payload.aesKey = val('db-key');
      payload.aesIv  = val('db-iv');
    } else if (opName === 'did-decode') {
      payload.did = val('did-decode-val');
    } else if (opName === 'did-encode') {
      payload.clientID  = val('die-clientid');
      payload.timestamp = val('die-ts');
      payload.appName   = val('die-app') || 'Seminyak';
    } else if (opName === 'jwt-decode') {
      payload.jwt = val('jwt-val');
    } else if (opName === 'sig-decode') {
      payload.signature = val('sigd-val');
    } else if (opName === 'signature') {
      payload.token     = val('sig-token');
      payload.timestamp = val('sig-ts');
      payload.aesCs     = val('sig-cs');
    } else if (opName === 'ios-token-sig') {
      payload.timestamp = val('ios-ts') || undefined;
    } else if (opName === 'snap-token-sig') {
      payload.clientKey = val('snap-key') || 'LPD-SEMINYAK-001';
      payload.timestamp = val('snap-ts') || undefined;
    } else if (opName === 'hashcode') {
      const step = val('hash-step');
      payload.step = step;
      if (step === 'lpd') {
        payload.nominal  = val('hc-nominal');
        payload.norekFrom = val('hc-nfrom');
        payload.norekTo  = val('hc-nto');
        payload.nameFrom = val('hc-nfromname');
        payload.nameTo   = val('hc-ntoname');
      } else {
        payload.fromAcc  = val('hc-from');
        payload.amount   = val('hc-amount');
        payload.dateTime = val('hc-dt');
        payload.refNo    = val('hc-ref');
        payload.destBank = val('hc-bank');
        payload.destAcc  = val('hc-acc');
        payload.destName = val('hc-name');
      }
    } else if (opName === 'reference') {
      payload.prefix = val('ref-prefix') || 'SMY';
      payload.count  = parseInt(val('ref-count')) || 5;
    } else if (opName === 'build-transfer') {
      payload.baseUrl    = val('bt-url') || 'https://lpdseminyak.biz.id:8000';
      payload.token      = val('bt-token');
      payload.didEncoded = val('bt-did');
      payload.aesKey     = val('bt-key');
      payload.aesIv      = val('bt-iv');
      payload.aesCs      = val('bt-cs');
      payload.fromAcc    = val('bt-from');
      payload.amount     = val('bt-amount');
      payload.destBank   = val('bt-dbank');
      payload.destAcc    = val('bt-dacc');
      payload.destName   = val('bt-dname');
      payload.dateTime   = val('bt-dt') || undefined;
      payload.refNo      = val('bt-ref') || undefined;
      payload.step       = val('bt-step');
    }

    const r = await callCrypto(payload);

    if (r.ok) {
      // Save keygen result for paste helpers
      if (opName === 'keygen') {
        lastKeygen = r.result;
      }
      // Special formatting for build-transfer: show curl command
      if (opName === 'build-transfer' && r.result) {
        const res = r.result;
        const curlLines = buildCurl(res);
        showResult('build-transfer', curlLines, true);
      } else if (opName === 'reference' && r.result && r.result.references) {
        showResult('reference', r.result.references.join('\\n'), true);
      } else {
        showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.result, true);
      }
    } else {
      showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.error || 'Unknown error', false);
    }
  } catch(e) {
    showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, 'Fetch error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

function buildCurl(res) {
  const h = res.headers || {};
  const b = res.body || {};
  const lines = [
    '# ═══ CURL COMMAND ═══',
    'curl -X POST "' + res.url + '" \\\\',
    Object.entries(h).map(([k,v]) => \`  -H "\${k}: \${v}" \\\\\`).join('\\n'),
    '  -d \'' + JSON.stringify(b, null, 2).replace(/'/g, "'\\\\''") + "'",
    '',
    '# ═══ HEADERS ═══',
    JSON.stringify(h, null, 2),
    '',
    '# ═══ BODY (encrypted) ═══',
    JSON.stringify(b, null, 2),
    '',
    '# ═══ DEBUG ═══',
    'refNo: ' + res.refNo,
    'timestamp: ' + res.ts,
    'hashRaw: ' + (res.debug && res.debug.hashRaw ? res.debug.hashRaw : 'N/A'),
  ].join('\\n');
  return lines;
}

// Init
fillNow('kg-ts');
</script>
</body>
</html>`;
}
