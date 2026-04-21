#!/usr/bin/env node
/**
 * ============================================================
 *  LPD Seminyak — Crypto Demo & Interactive Tool
 *  Contoh nyata dari curl real + builder request baru
 * ============================================================
 */

'use strict';
const {
  deriveAesKeys, aesEncrypt, aesDecrypt,
  decodeDID, decodeJWT, generateSignature,
  generateHashCodeCheck, generateHashCodePosting, generateHashCodeLPD,
  generateIosTokenSig, generateSnapTokenSig,
  decryptRequestBody, decodeSignature,
  nowJakarta, nowJakartaISO, generateReference,
  BPD_HASHCODE, CLIENT_SECRET,
} = require('./lpd-crypto.cjs');

// ============================================================
//  DATA REAL dari curl — /api/smart/transfer/bank/post
// ============================================================
const REAL = {
  did:       'U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8QVEzQS4yNDA5MTIXdJREV4T2pRME9qSXc8IT5RVkV6VVM0eU5EQTVNuMDAxLjAxMTAyXhNVEF5TURJMU1USXdNakExZkZOMDI1MTIwMjA1fDIwMjYtMDQtMjAgMTE6NDQ6MjAORFE2TWpBKCEpUTI5d2VYSnBaMmgwSU1LcElESXdNallnVUZRZ1IybHZjMjltZENCVGJXRnlkSEJ5YnlCSmJtUnZibVZ6YVdFZ0NsWmxjbk5wYjI0Z01TNHhMakY4TWpBeU5pMHdOQzB5TUNBeE1UbzBORG95TUh4QlVUTkJMakkwTURreE1pNHdNREV1TURFeE1ESXdNalV4TWpBeU1EVXkhXUNvcHlyaWdodCDCqSAyMDI2IFBUIEdpb3NvZnQgU21hcnRwcm8gSW5kb25lc2lhIApWZXJzaW9uIDEuMS4x=',
  jwt:       'eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0LTIwMTAyLTI2ODc2IiwiYWxnIjoiUlMyNTYifQ.eyJ0cmFuc190aW1lIjoiMjAyNi0wNC0yMFQxMTo0MzoyMCswODowMCJ9.Hi4em1vt9TI-XcaWXjr4pZPdr1_8K8lNO3I5SAWOTvZoA2c-ILo-8LasRawWaUMwVVhDLFmLBofvGCLnyI4MKuOMpMpS8PRN9v7-UPc-htnglJkC4o9TDPb9qEHOU3QReAn0jROlEK5V0ThZdGLGF-Ma0bffC_IUUFtl7rzq-CpWArJF6GkH6KJNAbYgfp64On_QjGkOuhFN6qB7t5uEU_dAC-INRiiMeKZilJnSE7DcEOR-3DChdsxo6wbrL8PLHDQdHQeG-4NOPgg13JUsWzVgZFn24v0-Kk_mxgBTJ_jhY9ioCfAI7Z5VourvGsdLAYtLAcpC3NR7mZlJHp_vyQ',
  sig:       'N2E2Y2VhNGNlZDgyYWQ3NTFlYWMwNjU4MjEwM2M4MGJlOTk4YWRlYWU2ZGRhZmNiNDg5NDE4ZjdhNDIwMGZjZjJhMzI3N2JmOTY4NjczYzQyMGE3OGI3YTEwZjIxYWYzMTNjMTg1ODcyYzcxNjA5ZWZjODU2MjdmM2E4YmNmNzg=',
  partner:   'E/klPO65C5RHkbTGbpbXegMbpDl5aURvjE42ObnIw86EGnyKSk3xJBiEJvGq1IPQyoXilooIZXCtcT6+IU8C/g==',
  timestamp: '2026-04-20 11:44:20',
  reference: 'SMY09441142O101202604',
  body: {
    from_acc:  '5re0Z89b0k2cwoL+K1HeRQ==',
    to_acc:    'AvYW9eJGgNn7ekcnO3rcVcZEU76bgksWwQMjYKgHwptVxBFQWKyxVjM7AULzMEI6stJoXOrq+oYe0ZOx1V31jeVSWNA+9ufZtGabdKHw+aVJTUtmj4yxkMH8dQXfe4CeOLFmbnPtVSA0P43ThtPd3gKhAhz1IZ75urnc9xpsHCA=',
    amount:    'rJTsdtV8mD+Ogo2Ize6Y3g==',
    date_time: 'SRcf8pIUGi2A4D3bRlZZX8oXtNtIe3E7T1rRncMBaCc=',
    to_name:   'q7fpK0JWVKPz2ZWqxXnt5A==',
    hash_code: '3MNidoAhRMGSsi02xjJY+J1uYWhj6VDxMzHYzUwwSsUTE6v40k+jnpED0wN3m7WULe7hwqh++m0zzUt1Dt/0gMAxRQoOwz+DCUV4GJa7uyw=',
    remark: ''
  }
};

// ─── Helper print ─────────────────────────────────────────────────────────
const HR = '─'.repeat(64);
function section(title) {
  console.log(`\n┌─ ${title} ${'─'.repeat(Math.max(0, 60 - title.length))}┐`);
}
function row(label, value, ok) {
  const icon = ok === undefined ? '│' : ok ? '│ ✅' : '│ ❌';
  console.log(`${icon} ${String(label).padEnd(14)}: ${value}`);
}
function end() { console.log('└' + '─'.repeat(64) + '┘'); }

// ============================================================
//  MAIN
// ============================================================
console.log('\n' + '╔' + '═'.repeat(64) + '╗');
console.log('║' + '  LPD SEMINYAK — ENCRYPT / DECRYPT DEMO'.padEnd(64) + '║');
console.log('╚' + '═'.repeat(64) + '╝');

// ──────────────────────────────────────────────────────────
//  BAGIAN A: DECODE REQUEST REAL
// ──────────────────────────────────────────────────────────
console.log('\n' + '▓'.repeat(66));
console.log('▓  BAGIAN A: DECODE REQUEST REAL (dari curl 20 Apr 2026)      ▓');
console.log('▓'.repeat(66));

// A1. JWT
section('A1. Authorization JWT (base64url decode)');
const jwt = decodeJWT(REAL.jwt);
row('trans_no',   jwt.header.trans_no);
row('trans_time', jwt.payload.trans_time);
row('algorithm',  jwt.header.alg);
end();

// A2. DID
section('A2. X-CLIENT-ID (Gio_DecryptDID)');
const did = decodeDID(REAL.did);
row('app',      did.app);
row('clientID', did.clientID);
row('reg_time', did.regTime);
row('raw',      did.rawDecoded.slice(0, 50) + '...');
end();

// A3. AES Key Derivation
section('A3. AES Key Derivation (Gio_CreateKeyAndIv)');
row('clientID',  did.clientID);
row('timestamp', REAL.timestamp);
const keys = deriveAesKeys(did.clientID, REAL.timestamp);
row('aes_key', keys.aesKey);
row('aes_iv',  keys.aesIv);
row('aes_cs',  keys.aesCs);
row('times',   keys.times.join(' / '));
end();

// A4. Body Decrypt
section('A4. Decrypt Body Fields (AES-256-CBC)');
const decBody = decryptRequestBody(REAL.body, keys.aesKey, keys.aesIv);
for (const [k, v] of Object.entries(decBody)) {
  const ok = !v.startsWith('[GAGAL');
  row(k, v, ok);
}
end();

// A5. X-SIGNATURE decode
section('A5. X-SIGNATURE (base64 → hex HMAC-SHA512)');
const sigHex = decodeSignature(REAL.sig);
row('hex', sigHex.slice(0, 40) + '...');
row('formula', 'HMAC-SHA512(token:timestamp, aes_cs)');
end();

// A6. X-PARTNER-ID decode
section('A6. X-PARTNER-ID (base64 → hex)');
const partnerHex = decodeSignature(REAL.partner);
row('hex', partnerHex.slice(0, 40) + '...');
row('len', Buffer.from(REAL.partner, 'base64').length + ' bytes (SHA-512 = 64 bytes)');
end();

// ──────────────────────────────────────────────────────────
//  BAGIAN B: ENCRYPT (buat request baru)
// ──────────────────────────────────────────────────────────
console.log('\n' + '▓'.repeat(66));
console.log('▓  BAGIAN B: ENCRYPT (simulasi buat request Transfer Bank)    ▓');
console.log('▓'.repeat(66));

// Gunakan data simulasi
const SIM = {
  clientID:   did.clientID,
  timestamp:  nowJakarta(),
  refNo:      generateReference('SMY'),
  fromAcc:    '1234567890',
  destBank:   '014',
  destAcc:    '0987654321',
  destName:   'I MADE BUDI SANTOSA',
  amount:     '500000',
  dateTime:   nowJakarta(),
  token:      REAL.jwt,   // pakai token lama (simulasi)
};

section('B1. Data Simulasi Transfer Bank');
row('clientID',  SIM.clientID);
row('timestamp', SIM.timestamp);
row('refNo',     SIM.refNo);
row('fromAcc',   SIM.fromAcc);
row('destBank',  SIM.destBank);
row('destAcc',   SIM.destAcc);
row('destName',  SIM.destName);
row('amount',    SIM.amount);
end();

section('B2. Derive AES Keys (dari clientID + timestamp)');
const simKeys = deriveAesKeys(SIM.clientID, SIM.timestamp);
row('aes_key', simKeys.aesKey);
row('aes_iv',  simKeys.aesIv);
row('aes_cs',  simKeys.aesCs);
end();

section('B3. Generate hash_code (Check/Inquiry)');
const hashCheck = generateHashCodeCheck({
  fromAcc: SIM.fromAcc, amount: SIM.amount,
  dateTime: SIM.dateTime, refNo: SIM.refNo,
  destBank: SIM.destBank, destAcc: SIM.destAcc
});
row('string', `%${SIM.fromAcc}#${SIM.amount}@${SIM.dateTime}^${SIM.refNo}*${SIM.destBank}~${SIM.destAcc}|${BPD_HASHCODE}%`.slice(0,50)+'...');
row('SHA256', hashCheck);
end();

section('B4. Generate hash_code (Posting)');
const hashPost = generateHashCodePosting({
  fromAcc: SIM.fromAcc, amount: SIM.amount,
  dateTime: SIM.dateTime, refNo: SIM.refNo,
  destBank: SIM.destBank, destAcc: SIM.destAcc, destName: SIM.destName
});
row('SHA256', hashPost);
end();

section('B5. Encrypt Body Fields');
const encFromAcc  = aesEncrypt(SIM.fromAcc,         simKeys.aesKey, simKeys.aesIv);
const encToAccChk = aesEncrypt(`${SIM.destBank}-${SIM.destAcc}-${hashCheck}`, simKeys.aesKey, simKeys.aesIv);
const encToAccPst = aesEncrypt(`${SIM.destBank}-${SIM.destAcc}`, simKeys.aesKey, simKeys.aesIv);
const encAmount   = aesEncrypt(SIM.amount,          simKeys.aesKey, simKeys.aesIv);
const encDateTime = aesEncrypt(SIM.dateTime,        simKeys.aesKey, simKeys.aesIv);
const encToName   = aesEncrypt(SIM.destName,        simKeys.aesKey, simKeys.aesIv);
const encHashPst  = aesEncrypt(hashPost,            simKeys.aesKey, simKeys.aesIv);

row('from_acc (enc)',        encFromAcc);
row('to_acc/check (enc)',    encToAccChk.slice(0,40)+'...');
row('to_acc/posting (enc)',  encToAccPst);
row('amount (enc)',          encAmount);
row('date_time (enc)',       encDateTime);
row('to_name (enc)',         encToName);
row('hash_code/post (enc)',  encHashPst.slice(0,40)+'...');
end();

section('B6. Generate X-SIGNATURE & X-PARTNER-ID');
const simSig     = generateSignature(SIM.token, SIM.timestamp, simKeys.aesCs);
row('X-SIGNATURE ', simSig.slice(0,40)+'...');
row('X-PARTNER-ID', simSig.slice(0,40)+'... (sama)');
row('formula', 'base64( HMAC-SHA512( token:timestamp, aes_cs ) )');
end();

// B7. Verify: Decrypt kembali field yang baru di-encrypt
section('B7. Verifikasi: Decrypt kembali hasil encrypt');
const checks = [
  ['from_acc',  encFromAcc,  SIM.fromAcc],
  ['amount',    encAmount,   SIM.amount],
  ['date_time', encDateTime, SIM.dateTime],
  ['to_name',   encToName,   SIM.destName],
];
let allOk = true;
for (const [label, enc, expected] of checks) {
  const dec = aesDecrypt(enc, simKeys.aesKey, simKeys.aesIv);
  const ok  = dec === expected;
  if (!ok) allOk = false;
  row(label, dec, ok);
}
row('RESULT', allOk ? 'SEMUA OK ✅' : 'ADA YANG GAGAL ❌');
end();

// ──────────────────────────────────────────────────────────
//  BAGIAN C: CURL COMMAND GENERATOR
// ──────────────────────────────────────────────────────────
console.log('\n' + '▓'.repeat(66));
console.log('▓  BAGIAN C: CURL COMMAND (Check Bank)                        ▓');
console.log('▓'.repeat(66));

const curlBody = JSON.stringify({
  from_acc:  encFromAcc,
  to_acc:    encToAccChk,
  amount:    encAmount,
  date_time: encDateTime,
  to_name:   '',
  hash_code: '',
  remark:    ''
}, null, 2);

console.log(`
curl -s -X POST "https://lpdseminyak.biz.id:8000/api/smart/transfer/bank/check" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ${SIM.token.slice(0,60)}..." \\
  -H "X-TIMESTAMP: ${SIM.timestamp}" \\
  -H "X-SIGNATURE: ${simSig.slice(0,40)}..." \\
  -H "X-PARTNER-ID: ${simSig.slice(0,40)}..." \\
  -H "X-CLIENT-ID: ${REAL.did.slice(0,40)}..." \\
  -H "X-REFERENCE: ${SIM.refNo}" \\
  -H "Client-IP: ." \\
  -d '${JSON.stringify({ from_acc: encFromAcc, to_acc: encToAccChk, amount: encAmount, date_time: encDateTime, to_name: '', hash_code: '', remark: '' })}'
`);

// ──────────────────────────────────────────────────────────
//  BAGIAN D: UTILITY FUNCTIONS SUMMARY
// ──────────────────────────────────────────────────────────
console.log('\n' + '▓'.repeat(66));
console.log('▓  BAGIAN D: QUICK REFERENCE — Semua Fungsi                   ▓');
console.log('▓'.repeat(66));

console.log(`
  ┌──────────────────────────────────────────────────────────────┐
  │  FUNGSI                KEGUNAAN                              │
  ├──────────────────────────────────────────────────────────────┤
  │  deriveAesKeys()       Derive AES key/iv/cs dari clientID+ts │
  │  aesEncrypt()          Encrypt field body (AES-256-CBC)      │
  │  aesDecrypt()          Decrypt field body (AES-256-CBC)      │
  │  decodeDID()           Decode X-CLIENT-ID → clientID         │
  │  decodeJWT()           Decode Authorization JWT              │
  │  generateSignature()   Buat X-SIGNATURE / X-PARTNER-ID       │
  │  generateHashCodeCheck()  SHA256 hash untuk Check/Inquiry    │
  │  generateHashCodePosting() SHA256 hash untuk Posting         │
  │  generateHashCodeLPD()    SHA256 hash untuk Transfer LPD     │
  │  generateIosTokenSig()    Buat X-SIGNATURE iOS token         │
  │  generateSnapTokenSig()   Buat X-SIGNATURE SNAP BPD          │
  │  nowJakarta()          Timestamp WIB "YYYY-MM-DD HH:MM:SS"   │
  │  nowJakartaISO()       Timestamp WIB ISO8601 +07:00          │
  │  generateReference()   Buat X-REFERENCE unik                 │
  │  decryptRequestBody()  Decrypt semua field body sekaligus    │
  │  decodeSignature()     Decode X-SIGNATURE base64 → hex       │
  └──────────────────────────────────────────────────────────────┘

  CARA PAKAI (require):
    const crypto = require('./lpd-crypto.cjs');
    const keys   = crypto.deriveAesKeys(clientID, timestamp);
    const enc    = crypto.aesEncrypt('1234567890', keys.aesKey, keys.aesIv);
    const dec    = crypto.aesDecrypt(enc, keys.aesKey, keys.aesIv);

  CLI COMMANDS:
    node lpd-crypto.js demo
    node lpd-crypto.js keygen <clientID> <timestamp>
    node lpd-crypto.js encrypt <plain> <aesKey_b64> <aesIv_b64>
    node lpd-crypto.js decrypt <cipher_b64> <aesKey_b64> <aesIv_b64>
    node lpd-crypto.js did <X-CLIENT-ID>
    node lpd-crypto.js jwt <Authorization>
    node lpd-crypto.js sig <X-SIGNATURE>
    node lpd-crypto.js hashcode <fromAcc> <amount> <dateTime> <refNo> <destBank> <destAcc> [destName]
    node lpd-crypto.js ref [prefix]
`);

console.log('✅ Demo selesai.\n');
