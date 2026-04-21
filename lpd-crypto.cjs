#!/usr/bin/env node
/**
 * ============================================================
 *  LPD Seminyak — Crypto Toolkit
 *  Encrypt / Decrypt / Generate semua header & body field
 *  Kompatibel dengan iosHelper.php (Giosoftech Smartpro)
 * ============================================================
 *
 *  ALGORITMA yang dicakup:
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  1. AES Key Derivation  — Gio_CreateKeyAndIv()             │
 *  │  2. AES-256-CBC Encrypt — Gio_Encrypt()                    │
 *  │  3. AES-256-CBC Decrypt — Gio_Decrypt()                    │
 *  │  4. DID Decode          — Gio_DecryptDID()                 │
 *  │  5. DID Encode          — kebalikan Gio_DecryptDID()       │
 *  │  6. JWT Decode          — Authorization header             │
 *  │  7. X-SIGNATURE         — HMAC-SHA512(token:ts, aes_cs)    │
 *  │  8. X-PARTNER-ID        — HMAC-SHA512(token:ts, aes_cs)    │
 *  │  9. hash_code Check     — SHA256 integrity string          │
 *  │ 10. iOS Token Signature — SHA256+RSA (private_key_lpd.pem) │
 *  │ 11. SNAP Token Signature— RSA-SHA256 (private_bpd_003.pem) │
 *  └─────────────────────────────────────────────────────────────┘
 *
 *  USAGE:
 *    node lpd-crypto.js demo          → demo dengan data dari curl real
 *    node lpd-crypto.js decrypt <b64> → decrypt 1 field AES
 *    node lpd-crypto.js encrypt <txt> → encrypt 1 field AES
 *    node lpd-crypto.js did <X-CLIENT-ID> → decode X-CLIENT-ID
 *    node lpd-crypto.js jwt <token>   → decode JWT Authorization
 *    node lpd-crypto.js keygen <clientID> <timestamp> → derive AES keys
 *    node lpd-crypto.js hashcode <fromAcc> <amount> <dateTime> <refNo> <destBank> <destAcc> <destName> → generate hash_code
 *    node lpd-crypto.js build         → interactive build request headers+body
 * ============================================================
 */

'use strict';
const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');

// ── Path kunci ─────────────────────────────────────────────────────────────
const KEY_DIR   = path.join(__dirname, 'lpd_seminyak');
const PRIV_BPD  = path.join(KEY_DIR, 'private_bpd_003.pem');
const PRIV_LPD  = path.join(KEY_DIR, 'private_key_lpd.pem');
const PUB_BPD   = path.join(KEY_DIR, 'public_key_bpd.pem');
const PUB_LPD   = path.join(KEY_DIR, 'keys', 'public_key.pem');

// ── Konstanta dari .env ─────────────────────────────────────────────────────
const BPD_HASHCODE   = 'p91wrswK';
const CLIENT_SECRET  = '7vCjkNHs';
const CLIENT_VA      = 'VA-325';
const WHITELIST_IP   = '34.50.74.78';
const BPD_PREFIX     = '989191';

// ============================================================
//  § 1 — AES KEY DERIVATION (Gio_CreateKeyAndIv)
//  Digunakan pada: Register flow (bukan DB lookup)
// ============================================================
/**
 * Derive AES key, IV, CS dari clientID + timestamp
 * Replika TEPAT dari PHP Gio_CreateKeyAndIv($clientID, $timeStamp)
 *
 * @param {string} clientID   — misal: "AQ3A.240912.001.01102025120205"
 * @param {string} timeStamp  — misal: "2026-04-20 11:44:20"
 * @returns {{ aesKey, aesIv, aesCs, times }}
 */
function deriveAesKeys(clientID, timeStamp) {
  // PHP: $times = explode(':', substr($timeStamp, -8))
  const lastEight = timeStamp.slice(-8);          // '11:44:20'
  const times     = lastEight.split(':').map(Number); // [11, 44, 20]

  // PHP: $keyBytes = hash_hmac('sha512', $clientID, $timeStamp, true)
  //      NOTE: message=clientID, key=timeStamp (urutan TERBALIK dari Node convention)
  const keyBytes = crypto.createHmac('sha512', timeStamp).update(clientID).digest();
  const keyLen   = keyBytes.length; // 64

  // PHP: $key = base64_encode(substr($keyBytes, $times[0], 32))
  const kStart  = times[0];
  // PHP: $iv  = base64_encode(substr($keyBytes, (int)(($keyLen+$times[1])/2)-16, 16))
  const ivStart = Math.floor((keyLen + times[1]) / 2) - 16;
  // PHP: $cs  = base64_encode(substr($keyBytes, (int)(($keyLen+$times[2])/3)-8, 8))
  const csStart = Math.floor((keyLen + times[2]) / 3) - 8;

  const aesKey = keyBytes.slice(kStart,  kStart  + 32).toString('base64');
  const aesIv  = keyBytes.slice(ivStart, ivStart + 16).toString('base64');
  const aesCs  = keyBytes.slice(csStart, csStart + 8 ).toString('base64');

  return { aesKey, aesIv, aesCs, times,
    kStart, ivStart, csStart,
    debug: {
      lastEight, times,
      kStart, ivStart, csStart,
      keyBytesHex: keyBytes.toString('hex').slice(0, 32) + '...'
    }
  };
}

// ============================================================
//  § 2 — AES-256-CBC ENCRYPT  (Gio_Encrypt)
// ============================================================
/**
 * Encrypt plaintext → base64 ciphertext
 * Replika dari openssl_encrypt($plain,'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)
 *
 * @param {string} plaintext
 * @param {string} aesKeyB64 — base64-encoded 32-byte key
 * @param {string} aesIvB64  — base64-encoded 16-byte IV
 * @returns {string} base64 ciphertext
 */
function aesEncrypt(plaintext, aesKeyB64, aesIvB64) {
  const key = Buffer.from(aesKeyB64, 'base64');
  const iv  = Buffer.from(aesIvB64,  'base64');
  const enc = crypto.createCipheriv('aes-256-cbc', key, iv);
  const buf = Buffer.concat([enc.update(plaintext, 'utf8'), enc.final()]);
  return buf.toString('base64');
}

// ============================================================
//  § 3 — AES-256-CBC DECRYPT  (Gio_Decrypt)
// ============================================================
/**
 * Decrypt base64 ciphertext → plaintext
 * Replika dari openssl_decrypt(base64_decode($enc),'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)
 *
 * @param {string} cipherB64  — base64 ciphertext
 * @param {string} aesKeyB64  — base64-encoded 32-byte key
 * @param {string} aesIvB64   — base64-encoded 16-byte IV
 * @returns {string} plaintext atau null jika gagal
 */
function aesDecrypt(cipherB64, aesKeyB64, aesIvB64) {
  try {
    const key = Buffer.from(aesKeyB64, 'base64');
    const iv  = Buffer.from(aesIvB64,  'base64');
    const buf = Buffer.from(cipherB64,  'base64');
    const dec = crypto.createDecipheriv('aes-256-cbc', key, iv);
    dec.setAutoPadding(true);
    return Buffer.concat([dec.update(buf), dec.final()]).toString('utf8');
  } catch (e) {
    return null;
  }
}

// ============================================================
//  § 4 — DID DECODE  (Gio_DecryptDID)
// ============================================================
/**
 * Decode X-CLIENT-ID → { clientID, app, regTime, rawDecoded }
 * Replika dari PHP Gio_DecryptDID($id)
 *
 * Format DID setelah decode: "Seminyak|clientID|timestamp"
 *
 * @param {string} did — nilai header X-CLIENT-ID
 * @returns {{ clientID, app, regTime, rawDecoded, parts }}
 */
function decodeDID(did) {
  // Get base64 padding suffix
  const fix  = did.endsWith('==') ? '==' : did.endsWith('=') ? '=' : '';

  // Kolom & panjang disandikan di posisi 7-12 dan 16-19
  const col  = did.substring(7, 13);
  const col1 = parseInt(col[0]) * 10 + col.charCodeAt(1) - 64;
  const col2 = 100 + parseInt(col[2]) * 10 + col.charCodeAt(3) - 64;
  const col3 = 100 + parseInt(col[4]) * 10 + col.charCodeAt(5) - 64;

  const lenSeg = did.substring(16, 20);
  const len1   = lenSeg.charCodeAt(0) - 64;
  const len2   = lenSeg.charCodeAt(1) - 64;
  const len3   = parseInt(lenSeg.slice(2));

  const idd = did.substring(col1, col1 + len1)
            + did.substring(col2, col2 + len2)
            + did.substring(col3, col3 + len3);

  const rawDecoded = Buffer.from(idd + fix, 'base64').toString('utf8');
  const parts      = rawDecoded.split('|');

  return {
    app:        parts[0] || '',         // 'Seminyak'
    clientID:   parts[1] || '',         // 'AQ3A.240912.001.01102025120205'
    regTime:    parts[2] || '',         // '2026-04-20 11:44:20'
    rawDecoded,
    parts,
    debug: { col1, col2, col3, len1, len2, len3, idd: idd.slice(0,20)+'...' }
  };
}

// ============================================================
//  § 5 — DID ENCODE  (kebalikan Gio_DecryptDID)
// ============================================================
/**
 * Buat X-CLIENT-ID dari clientID + timestamp + appName
 * Ini adalah kebalikan (reverse) dari Gio_DecryptDID
 *
 * @param {string} clientID   — misal "AQ3A.240912.001.01102025120205"
 * @param {string} timestamp  — misal "2026-04-21 10:30:00"
 * @param {string} appName    — default "Seminyak"
 * @param {string} appInfo    — info tambahan (copyright dsb)
 * @returns {string} encoded DID (X-CLIENT-ID value)
 */
function encodeDID(clientID, timestamp, appName = 'Seminyak', appInfo = '') {
  // Bangun plaintext yang akan di-encode
  const plain  = `${appName}|${clientID}|${timestamp}`;
  const b64raw = Buffer.from(plain).toString('base64');

  // Hapus padding untuk disembunyikan di dalam encoded string
  const fix   = b64raw.endsWith('==') ? '==' : b64raw.endsWith('=') ? '=' : '';
  const b64   = b64raw.slice(0, b64raw.length - fix.length);
  const b64Len = b64.length;

  // Tentukan 3 segmen posisi di dalam string output
  // col1=20, col2=104, col3=172 (nilai yang menghasilkan DID valid)
  const col1 = 20;
  const col2 = 104;
  const col3 = 172;

  // Hitung panjang setiap segmen base64 yang dipecah menjadi 3 bagian
  const partLen = Math.floor(b64Len / 3);
  const len1    = partLen;
  const len2    = partLen;
  const len3    = b64Len - len1 - len2;

  const seg1 = b64.slice(0,      len1);
  const seg2 = b64.slice(len1,   len1 + len2);
  const seg3 = b64.slice(len1 + len2);

  // Encode col & len sebagai karakter ASCII (kebalikan dari decode)
  // col1=20: char0 = floor(20/10)='2', char1 = chr((20%10)+64)='D' → '2D'
  // col2=104: 100+c2 → c2=4 → char2=floor(4/10)='0', char3=chr((4%10)+64)='D' → '0D'
  // col3=172: 100+c3 → c3=72 → char4=floor(72/10)='7', char5=chr((72%10)+64)='H' → '7H'
  const colStr = encodeColChar(col1) + encodeColChar(col2 - 100) + encodeColChar(col3 - 100);

  // len1=charCode+64, len2=charCode+64, len3=2digit
  const lenStr = String.fromCharCode(len1 + 64)
               + String.fromCharCode(len2 + 64)
               + String(len3).padStart(2, '0');

  // Bangun output string dengan padding sebelum/sesudah segmen
  // Layout: [0..6]=random/prefix, [7..12]=colStr, [13..15]=pad, [16..19]=lenStr
  // kemudian sisipkan seg1 di col1, seg2 di col2, seg3 di col3
  const totalLen = Math.max(col3 + len3, 200);
  let out = new Array(totalLen + 50).fill('A');

  // Sisipkan kolom & panjang di posisi tetap
  out[7]  = colStr[0]; out[8]  = colStr[1];
  out[9]  = colStr[2]; out[10] = colStr[3];
  out[11] = colStr[4]; out[12] = colStr[5];
  out[16] = lenStr[0]; out[17] = lenStr[1];
  out[18] = lenStr[2]; out[19] = lenStr[3];

  // Sisipkan segmen base64 di posisi yang telah ditentukan
  for (let i = 0; i < seg1.length; i++) out[col1 + i] = seg1[i];
  for (let i = 0; i < seg2.length; i++) out[col2 + i] = seg2[i];
  for (let i = 0; i < seg3.length; i++) out[col3 + i] = seg3[i];

  // Tambahkan info aplikasi setelah segmen3 (seperti di DID asli)
  const suffix = appInfo || '';
  const result = out.join('').slice(0, col3 + len3) + fix;

  return result;
}

function encodeColChar(val) {
  return String(Math.floor(val / 10)) + String.fromCharCode((val % 10) + 64);
}

// ============================================================
//  § 6 — JWT DECODE  (Authorization header)
// ============================================================
/**
 * Decode JWT Authorization (custom format dari lamanuna.biz.id)
 * Format: base64url(header).base64url(payload).base64url(sig)
 *
 * @param {string} jwt
 * @returns {{ header, payload, signatureB64 }}
 */
function decodeJWT(jwt) {
  const parts = jwt.split('.');
  if (parts.length < 2) return { error: 'Bukan format JWT valid' };
  try {
    const header  = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    const sig     = parts[2] || '';
    return { header, payload, signatureB64: sig,
      raw: { headerB64: parts[0], payloadB64: parts[1] }
    };
  } catch(e) {
    return { error: e.message };
  }
}

/**
 * Buat JWT Authorization (custom RS256)
 * Header: { trans_no, alg:'RS256' }
 * Payload: { trans_time }
 *
 * @param {string} transNo    — nomor transaksi
 * @param {string} transTime  — waktu ISO8601
 * @param {string} privKeyPem — private key PEM untuk sign
 * @returns {string} JWT string
 */
function createJWT(transNo, transTime, privKeyPem) {
  const header  = Buffer.from(JSON.stringify({ trans_no: transNo, alg: 'RS256' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ trans_time: transTime })).toString('base64url');
  const msg     = `${header}.${payload}`;

  const sign    = crypto.createSign('SHA256');
  sign.update(msg);
  const sig = sign.sign(privKeyPem, 'base64url');
  return `${msg}.${sig}`;
}

// ============================================================
//  § 7 & 8 — X-SIGNATURE & X-PARTNER-ID
// ============================================================
/**
 * Generate X-SIGNATURE / X-PARTNER-ID
 * Formula: base64( HMAC-SHA512( token + ":" + timestamp, aes_cs, BINARY ) )
 *
 * @param {string} token      — JWT Authorization string
 * @param {string} timeStamp  — X-TIMESTAMP
 * @param {string} aesCsB64   — base64-encoded aes_cs (8 bytes)
 * @returns {string} base64
 */
function generateSignature(token, timeStamp, aesCsB64) {
  const cs  = Buffer.from(aesCsB64, 'base64');
  const msg = `${token}:${timeStamp}`;
  return crypto.createHmac('sha512', cs).update(msg).digest('base64');
}

// ============================================================
//  § 9 — HASH_CODE INTEGRITY
// ============================================================
/**
 * Generate hash_code untuk Transfer Bank (Check/Inquiry)
 * Formula: SHA256( "%" + fromAcc + "#" + amount + "@" + dateTime + "^" + refNo + "*" + destBank + "~" + destAcc + "|" + BPD_HASHCODE + "%" )
 *
 * @param {object} p — { fromAcc, amount, dateTime, refNo, destBank, destAcc }
 * @returns {string} hex SHA256
 */
function generateHashCodeCheck(p) {
  const str = `%${p.fromAcc}#${p.amount}@${p.dateTime}^${p.refNo}*${p.destBank}~${p.destAcc}|${BPD_HASHCODE}%`;
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Generate hash_code untuk Transfer Bank (Posting)
 * Formula: SHA256( "@" + fromAcc + "|" + amount + "~" + dateTime + "*" + refNo + "^" + destBank + "#" + destAcc + "(" + destName + ")" + BPD_HASHCODE + "@" )
 *
 * @param {object} p — { fromAcc, amount, dateTime, refNo, destBank, destAcc, destName }
 * @returns {string} hex SHA256
 */
function generateHashCodePosting(p) {
  const str = `@${p.fromAcc}|${p.amount}~${p.dateTime}*${p.refNo}^${p.destBank}#${p.destAcc}(${p.destName})${BPD_HASHCODE}@`;
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Generate hash_code untuk Transfer LPD (internal)
 * Formula: SHA256( "{" + nominal + "*" + norekFrom + "^" + norekTo + "%" + nameFrom + "#" + nameTo + "@" + BPD_HASHCODE + "}" )
 */
function generateHashCodeLPD(p) {
  const str = `{${p.nominal}*${p.norekFrom}^${p.norekTo}%${p.nameFrom}#${p.nameTo}@${BPD_HASHCODE}}`;
  return crypto.createHash('sha256').update(str).digest('hex');
}

// ============================================================
//  § 10 — iOS TOKEN SIGNATURE
// ============================================================
/**
 * Generate X-SIGNATURE untuk /smart/access/token
 * Formula (PHP): hash("sha256", "Seminyak|" + timestamp) → sign RSA-SHA256
 *
 * @param {string} timestamp    — X-TIMESTAMP
 * @param {string|null} privPem — private key PEM (default: PRIV_LPD)
 * @returns {{ signature, timestamp, clientStamp }}
 */
function generateIosTokenSig(timestamp, privPem = null) {
  const priv        = privPem || fs.readFileSync(PRIV_LPD, 'utf8');
  const clientStamp = crypto.createHash('sha256').update(`Seminyak|${timestamp}`).digest('hex');
  const sig         = crypto.sign('SHA256', Buffer.from(clientStamp), {
    key: priv, padding: crypto.constants.RSA_PKCS1_PADDING
  });
  return { signature: sig.toString('base64'), timestamp, clientStamp };
}

// ============================================================
//  § 11 — SNAP TOKEN SIGNATURE (BPD)
// ============================================================
/**
 * Generate X-SIGNATURE untuk /api/v1.0/access-token/b2b (SNAP BPD)
 * Formula: RSA-SHA256 sign( clientKey + "|" + timestamp )
 *
 * @param {string} clientKey  — misal "LPD-SEMINYAK-001"
 * @param {string} timestamp  — ISO8601 Jakarta
 * @param {string|null} privPem
 * @returns {{ signature, clientKey, timestamp, message }}
 */
function generateSnapTokenSig(clientKey, timestamp, privPem = null) {
  const priv = privPem || fs.readFileSync(PRIV_BPD, 'utf8');
  const msg  = `${clientKey}|${timestamp}`;
  const sign = crypto.createSign('SHA256');
  sign.update(msg);
  const signature = sign.sign(priv, 'base64');
  return { signature, clientKey, timestamp, message: msg };
}

// ============================================================
//  § 12 — TIMESTAMP HELPER
// ============================================================
/**
 * Timestamp Jakarta (WIB UTC+7) dalam format "YYYY-MM-DD HH:MM:SS"
 * (format yang digunakan iOS API)
 */
function nowJakarta() {
  const now    = new Date();
  const offset = 7 * 60;
  const local  = new Date(now.getTime() + offset * 60_000);
  return local.toISOString().replace('T', ' ').slice(0, 19);
}

/**
 * Timestamp Jakarta ISO8601 dengan offset (untuk SNAP API)
 * Format: "YYYY-MM-DDTHH:MM:SS+07:00"
 */
function nowJakartaISO() {
  const now   = new Date();
  const off   = 7 * 60;
  const local = new Date(now.getTime() + off * 60_000);
  return local.toISOString().replace('Z', '').slice(0, 19) + '+07:00';
}

/**
 * Generate X-REFERENCE unik format SMY
 * Format: "SMY" + HHMMSS + random 4digit + refCode + YYYYMMDD
 */
function generateReference(prefix = 'SMY') {
  const now   = new Date(new Date().getTime() + 7 * 3600_000);
  const HHMMSS = now.toISOString().slice(11, 19).replace(/:/g, '').slice(0, 6);
  const rand  = String(Math.floor(Math.random() * 9000) + 1000);
  const date  = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `${prefix}${HHMMSS}${rand}O1012${date.slice(4)}`;
}

// ============================================================
//  § 13 — BUILD REQUEST (full request builder)
// ============================================================
/**
 * Build lengkap request /smart/transfer/bank/post
 *
 * @param {object} opts
 *   opts.clientID   — imei/client ID
 *   opts.regTime    — registration timestamp (dari DID)
 *   opts.didEncoded — X-CLIENT-ID (encoded DID)
 *   opts.aesKey     — base64 AES key (dari DB atau deriveAesKeys)
 *   opts.aesIv      — base64 AES IV
 *   opts.aesCs      — base64 AES CS
 *   opts.token      — JWT token (Authorization)
 *   opts.fromAcc    — nomor rekening asal (plaintext)
 *   opts.toAcc      — nomor rekening tujuan format "bankCode-accNo" (plaintext)
 *   opts.destBank   — kode bank tujuan
 *   opts.destAcc    — nomor rekening tujuan
 *   opts.destName   — nama penerima
 *   opts.amount     — nominal (string/number)
 *   opts.dateTime   — tanggal waktu transaksi
 *   opts.refNo      — X-REFERENCE
 *   opts.step       — 'check'|'inquiry'|'posting'
 */
function buildBankTransferRequest(opts) {
  const ts = opts.timestamp || nowJakarta();
  const refNo = opts.refNo || generateReference();

  // Encrypt semua field body
  const encFromAcc  = aesEncrypt(opts.fromAcc,  opts.aesKey, opts.aesIv);
  const encAmount   = aesEncrypt(String(opts.amount), opts.aesKey, opts.aesIv);
  const encDateTime = aesEncrypt(opts.dateTime, opts.aesKey, opts.aesIv);
  const encToName   = aesEncrypt(opts.destName, opts.aesKey, opts.aesIv);

  // to_acc = "bankCode-accNo" atau "bankCode-accNo-hashRaw" (untuk check)
  let hashRaw, encHashCode, encToAcc;

  if (opts.step === 'check' || opts.step === 'inquiry') {
    hashRaw    = generateHashCodeCheck({
      fromAcc: opts.fromAcc, amount: String(opts.amount),
      dateTime: opts.dateTime, refNo,
      destBank: opts.destBank, destAcc: opts.destAcc
    });
    const toAccPlain = `${opts.destBank}-${opts.destAcc}-${hashRaw}`;
    encToAcc   = aesEncrypt(toAccPlain, opts.aesKey, opts.aesIv);
    encHashCode = null; // tidak dipakai di check
  } else {
    // posting
    hashRaw    = generateHashCodePosting({
      fromAcc: opts.fromAcc, amount: String(opts.amount),
      dateTime: opts.dateTime, refNo,
      destBank: opts.destBank, destAcc: opts.destAcc, destName: opts.destName
    });
    const toAccPlain = `${opts.destBank}-${opts.destAcc}`;
    encToAcc    = aesEncrypt(toAccPlain, opts.aesKey, opts.aesIv);
    encHashCode = aesEncrypt(hashRaw, opts.aesKey, opts.aesIv);
  }

  // X-SIGNATURE = X-PARTNER-ID = HMAC-SHA512(token:timestamp, aes_cs)
  const signature  = generateSignature(opts.token, ts, opts.aesCs);
  const partnerID  = generateSignature(opts.token, ts, opts.aesCs);

  const body = {
    from_acc:  encFromAcc,
    to_acc:    encToAcc,
    amount:    encAmount,
    date_time: encDateTime,
    to_name:   encToName,
    hash_code: encHashCode || '',
    remark:    opts.remark || '',
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': opts.token,
    'X-TIMESTAMP':   ts,
    'X-SIGNATURE':   signature,
    'X-PARTNER-ID':  partnerID,
    'X-CLIENT-ID':   opts.didEncoded,
    'X-REFERENCE':   refNo,
    'Client-IP':     '.',
  };

  const url = `${opts.baseUrl || 'https://lpdseminyak.biz.id:8000'}/api/smart/transfer/bank/${opts.step || 'post'}`;

  return {
    url, headers, body, refNo, ts,
    debug: { hashRaw, encHashCode, encFromAcc, encAmount, encDateTime, encToAcc }
  };
}

// ============================================================
//  § 14 — DECRYPT FULL REQUEST (debug existing request)
// ============================================================
/**
 * Decrypt semua field body dari request yang sudah ada
 *
 * @param {object} body      — body fields (encrypted)
 * @param {string} aesKey    — base64 AES key
 * @param {string} aesIv     — base64 AES IV
 * @returns {object}         — plaintext fields
 */
function decryptRequestBody(body, aesKey, aesIv) {
  const result = {};
  for (const [k, v] of Object.entries(body)) {
    if (!v) { result[k] = ''; continue; }
    const dec = aesDecrypt(v, aesKey, aesIv);
    result[k] = dec !== null ? dec : `[GAGAL DECRYPT: ${v.slice(0,20)}...]`;
  }
  return result;
}

// ============================================================
//  § 15 — X-SIGNATURE DECODE
// ============================================================
/**
 * Decode X-SIGNATURE (base64 → hex HMAC-SHA512)
 *
 * @param {string} sigB64
 * @returns {string} hex string
 */
function decodeSignature(sigB64) {
  return Buffer.from(sigB64, 'base64').toString('hex');
}

// ── EXPORTS ────────────────────────────────────────────────────────────────
module.exports = {
  deriveAesKeys,
  aesEncrypt,
  aesDecrypt,
  decodeDID,
  encodeDID,
  decodeJWT,
  createJWT,
  generateSignature,
  generateHashCodeCheck,
  generateHashCodePosting,
  generateHashCodeLPD,
  generateIosTokenSig,
  generateSnapTokenSig,
  nowJakarta,
  nowJakartaISO,
  generateReference,
  buildBankTransferRequest,
  decryptRequestBody,
  decodeSignature,
  // Konstanta
  BPD_HASHCODE,
  CLIENT_SECRET,
  CLIENT_VA,
  WHITELIST_IP,
  BPD_PREFIX,
};

// ── CLI RUNNER ─────────────────────────────────────────────────────────────
if (require.main === module) {
  const cmd  = process.argv[2] || 'demo';
  const args = process.argv.slice(3);

  switch (cmd) {

    // ── demo ─────────────────────────────────────────────────────────────
    case 'demo': {
      console.log('\n' + '═'.repeat(65));
      console.log('  LPD Seminyak Crypto Toolkit — DEMO');
      console.log('═'.repeat(65));

      // Data dari curl real
      const REAL_DID  = 'U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8QVEzQS4yNDA5MTIXdJREV4T2pRME9qSXc8IT5RVkV6VVM0eU5EQTVNuMDAxLjAxMTAyXhNVEF5TURJMU1USXdNakExZkZOMDI1MTIwMjA1fDIwMjYtMDQtMjAgMTE6NDQ6MjAORFE2TWpBKCEpUTI5d2VYSnBaMmgwSU1LcElESXdNallnVUZRZ1IybHZjMjltZENCVGJXRnlkSEJ5YnlCSmJtUnZibVZ6YVdFZ0NsWmxjbk5wYjI0Z01TNHhMakY4TWpBeU5pMHdOQzB5TUNBeE1UbzBORG95TUh4QlVUTkJMakkwTURreE1pNHdNREV1TURFeE1ESXdNalV4TWpBeU1EVXkhXUNvcHlyaWdodCDCqSAyMDI2IFBUIEdpb3NvZnQgU21hcnRwcm8gSW5kb25lc2lhIApWZXJzaW9uIDEuMS4x=';
      const REAL_JWT  = 'eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0LTIwMTAyLTI2ODc2IiwiYWxnIjoiUlMyNTYifQ.eyJ0cmFuc190aW1lIjoiMjAyNi0wNC0yMFQxMTo0MzoyMCswODowMCJ9.Hi4em1vt9TI-XcaWXjr4pZPdr1_8K8lNO3I5SAWOTvZoA2c-ILo-8LasRawWaUMwVVhDLFmLBofvGCLnyI4MKuOMpMpS8PRN9v7-UPc-htnglJkC4o9TDPb9qEHOU3QReAn0jROlEK5V0ThZdGLGF-Ma0bffC_IUUFtl7rzq-CpWArJF6GkH6KJNAbYgfp64On_QjGkOuhFN6qB7t5uEU_dAC-INRiiMeKZilJnSE7DcEOR-3DChdsxo6wbrL8PLHDQdHQeG-4NOPgg13JUsWzVgZFn24v0-Kk_mxgBTJ_jhY9ioCfAI7Z5VourvGsdLAYtLAcpC3NR7mZlJHp_vyQ';
      const REAL_SIG  = 'N2E2Y2VhNGNlZDgyYWQ3NTFlYWMwNjU4MjEwM2M4MGJlOTk4YWRlYWU2ZGRhZmNiNDg5NDE4ZjdhNDIwMGZjZjJhMzI3N2JmOTY4NjczYzQyMGE3OGI3YTEwZjIxYWYzMTNjMTg1ODcyYzcxNjA5ZWZjODU2MjdmM2E4YmNmNzg=';
      const REAL_TS   = '2026-04-20 11:44:20';

      // 1. Decode JWT
      console.log('\n┌─ 1. Decode JWT (Authorization) ──────────────────────────────┐');
      const jwt = decodeJWT(REAL_JWT);
      console.log('│ trans_no  :', jwt.header.trans_no);
      console.log('│ trans_time:', jwt.payload.trans_time);
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 2. Decode DID
      console.log('\n┌─ 2. Decode X-CLIENT-ID (DID) ────────────────────────────────┐');
      const did = decodeDID(REAL_DID);
      console.log('│ app      :', did.app);
      console.log('│ clientID :', did.clientID);
      console.log('│ regTime  :', did.regTime);
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 3. Derive AES Keys
      console.log('\n┌─ 3. Derive AES Keys (Gio_CreateKeyAndIv) ────────────────────┐');
      const keys = deriveAesKeys(did.clientID, REAL_TS);
      console.log('│ aes_key :', keys.aesKey);
      console.log('│ aes_iv  :', keys.aesIv);
      console.log('│ aes_cs  :', keys.aesCs);
      console.log('│ (times  :', keys.times.join(':'), ')');
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 4. Decrypt body dari curl real
      console.log('\n┌─ 4. Decrypt Body Fields ─────────────────────────────────────┐');
      const encBody = {
        from_acc:  '5re0Z89b0k2cwoL+K1HeRQ==',
        to_acc:    'AvYW9eJGgNn7ekcnO3rcVcZEU76bgksWwQMjYKgHwptVxBFQWKyxVjM7AULzMEI6stJoXOrq+oYe0ZOx1V31jeVSWNA+9ufZtGabdKHw+aVJTUtmj4yxkMH8dQXfe4CeOLFmbnPtVSA0P43ThtPd3gKhAhz1IZ75urnc9xpsHCA=',
        amount:    'rJTsdtV8mD+Ogo2Ize6Y3g==',
        date_time: 'SRcf8pIUGi2A4D3bRlZZX8oXtNtIe3E7T1rRncMBaCc=',
        to_name:   'q7fpK0JWVKPz2ZWqxXnt5A==',
        hash_code: '3MNidoAhRMGSsi02xjJY+J1uYWhj6VDxMzHYzUwwSsUTE6v40k+jnpED0wN3m7WULe7hwqh++m0zzUt1Dt/0gMAxRQoOwz+DCUV4GJa7uyw=',
      };
      const decBody = decryptRequestBody(encBody, keys.aesKey, keys.aesIv);
      for (const [k, v] of Object.entries(decBody)) {
        const status = v.startsWith('[GAGAL') ? '❌' : '✅';
        console.log(`│ ${status} ${k.padEnd(10)}: ${v}`);
      }
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 5. Decode X-SIGNATURE
      console.log('\n┌─ 5. Decode X-SIGNATURE ──────────────────────────────────────┐');
      console.log('│ hex:', decodeSignature(REAL_SIG));
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 6. Encrypt/Decrypt test
      console.log('\n┌─ 6. Test Encrypt → Decrypt ──────────────────────────────────┐');
      const plain = '1234567890';
      const enc   = aesEncrypt(plain, keys.aesKey, keys.aesIv);
      const dec   = aesDecrypt(enc,   keys.aesKey, keys.aesIv);
      console.log('│ plain  :', plain);
      console.log('│ encrypt:', enc);
      console.log('│ decrypt:', dec, dec === plain ? '✅' : '❌');
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 7. Generate new X-REFERENCE
      console.log('\n┌─ 7. Generate X-REFERENCE ─────────────────────────────────────┐');
      console.log('│', generateReference());
      console.log('│', generateReference());
      console.log('└──────────────────────────────────────────────────────────────┘');

      // 8. iOS Token signature
      console.log('\n┌─ 8. iOS Token Signature ─────────────────────────────────────┐');
      try {
        const iosSig = generateIosTokenSig(nowJakarta());
        console.log('│ timestamp :', iosSig.timestamp);
        console.log('│ hash msg  :', iosSig.clientStamp.slice(0,32) + '...');
        console.log('│ signature :', iosSig.signature.slice(0,40) + '...');
      } catch(e) { console.log('│ ❌', e.message); }
      console.log('└──────────────────────────────────────────────────────────────┘');

      console.log('\n✅ Demo selesai. Semua fungsi tersedia via require(\'./lpd-crypto\')\n');
      break;
    }

    // ── keygen ─────────────────────────────────────────────────────────
    case 'keygen': {
      const clientID  = args[0];
      const timestamp = args[1];
      if (!clientID || !timestamp) {
        console.log('Usage: node lpd-crypto.js keygen <clientID> <timestamp>');
        console.log('Contoh: node lpd-crypto.js keygen "AQ3A.240912.001.01" "2026-04-20 11:44:20"');
        break;
      }
      const k = deriveAesKeys(clientID, timestamp);
      console.log('\n── AES Key Derivation ─────────────────────────────────');
      console.log('clientID  :', clientID);
      console.log('timestamp :', timestamp);
      console.log('aes_key   :', k.aesKey);
      console.log('aes_iv    :', k.aesIv);
      console.log('aes_cs    :', k.aesCs);
      break;
    }

    // ── encrypt ────────────────────────────────────────────────────────
    case 'encrypt': {
      const plain  = args[0];
      const aesKey = args[1];
      const aesIv  = args[2];
      if (!plain || !aesKey || !aesIv) {
        console.log('Usage: node lpd-crypto.js encrypt <plaintext> <aesKey_base64> <aesIv_base64>');
        break;
      }
      console.log(aesEncrypt(plain, aesKey, aesIv));
      break;
    }

    // ── decrypt ────────────────────────────────────────────────────────
    case 'decrypt': {
      const cipher = args[0];
      const aesKey = args[1];
      const aesIv  = args[2];
      if (!cipher || !aesKey || !aesIv) {
        console.log('Usage: node lpd-crypto.js decrypt <base64cipher> <aesKey_base64> <aesIv_base64>');
        break;
      }
      const result = aesDecrypt(cipher, aesKey, aesIv);
      console.log(result !== null ? result : '❌ Gagal decrypt (key/iv salah?)');
      break;
    }

    // ── did ────────────────────────────────────────────────────────────
    case 'did': {
      const raw = args[0];
      if (!raw) { console.log('Usage: node lpd-crypto.js did <X-CLIENT-ID>'); break; }
      const r = decodeDID(raw);
      console.log('\n── DID Decode ─────────────────────────────────────────');
      console.log('app       :', r.app);
      console.log('clientID  :', r.clientID);
      console.log('regTime   :', r.regTime);
      console.log('rawDecoded:', r.rawDecoded);
      break;
    }

    // ── jwt ────────────────────────────────────────────────────────────
    case 'jwt': {
      const token = args[0];
      if (!token) { console.log('Usage: node lpd-crypto.js jwt <JWT>'); break; }
      const r = decodeJWT(token);
      if (r.error) { console.log('❌ Error:', r.error); break; }
      console.log('\n── JWT Decode ─────────────────────────────────────────');
      console.log('Header  :', JSON.stringify(r.header));
      console.log('Payload :', JSON.stringify(r.payload));
      console.log('Sig     :', r.signatureB64.slice(0, 40) + '...');
      break;
    }

    // ── hashcode ───────────────────────────────────────────────────────
    case 'hashcode': {
      const [fromAcc, amount, dateTime, refNo, destBank, destAcc, destName] = args;
      if (!fromAcc) {
        console.log('Usage: node lpd-crypto.js hashcode <fromAcc> <amount> <dateTime> <refNo> <destBank> <destAcc> [destName]');
        break;
      }
      const check  = generateHashCodeCheck({ fromAcc, amount, dateTime, refNo, destBank, destAcc });
      const posting = destName ? generateHashCodePosting({ fromAcc, amount, dateTime, refNo, destBank, destAcc, destName }) : null;
      console.log('\n── Hash Code ──────────────────────────────────────────');
      console.log('Check/Inquiry :', check);
      if (posting) console.log('Posting       :', posting);
      break;
    }

    // ── sig ────────────────────────────────────────────────────────────
    case 'sig': {
      const [sigB64] = args;
      if (!sigB64) { console.log('Usage: node lpd-crypto.js sig <base64>'); break; }
      console.log('\n── X-SIGNATURE Decode ─────────────────────────────────');
      console.log('hex :', decodeSignature(sigB64));
      break;
    }

    // ── ref ────────────────────────────────────────────────────────────
    case 'ref': {
      const prefix = args[0] || 'SMY';
      for (let i = 0; i < 5; i++) console.log(generateReference(prefix));
      break;
    }

    // ── help ───────────────────────────────────────────────────────────
    default: {
      console.log(`
LPD Seminyak Crypto Toolkit — Commands:

  node lpd-crypto.js demo
      Demo lengkap dengan data dari curl real

  node lpd-crypto.js keygen <clientID> <timestamp>
      Derive AES key/iv/cs dari clientID + timestamp

  node lpd-crypto.js encrypt <plaintext> <aesKey_b64> <aesIv_b64>
      Encrypt 1 field body

  node lpd-crypto.js decrypt <cipher_b64> <aesKey_b64> <aesIv_b64>
      Decrypt 1 field body

  node lpd-crypto.js did <X-CLIENT-ID>
      Decode X-CLIENT-ID → clientID + timestamp

  node lpd-crypto.js jwt <Authorization>
      Decode JWT Authorization header

  node lpd-crypto.js sig <X-SIGNATURE_base64>
      Decode X-SIGNATURE → hex

  node lpd-crypto.js hashcode <fromAcc> <amount> <dateTime> <refNo> <destBank> <destAcc> [destName]
      Generate hash_code untuk integrity check

  node lpd-crypto.js ref [prefix]
      Generate X-REFERENCE unik (default prefix: SMY)
`);
    }
  }
}
