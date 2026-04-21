/**
 * ============================================================
 *  LPD Seminyak — Edge Crypto (Cloudflare Workers Native)
 *  All operations implemented using Web Crypto API only.
 *  No Node.js, no fs, no Buffer — pure edge-compatible code.
 * ============================================================
 */

// ── Embedded PEM private keys ────────────────────────────────────────────────
const PRIV_LPD_PEM = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD3KiZu/RXRO+R/
onutm7eR205pKykTggG7rWQyCJj/bMK6IqxESOHjO8Y4quWPnQCnO+TKwENJzrKj
z8S91zQgoHSfYYc2mJ5Rs93bUzvO5csPbzzQ+JwKxu3aFgvjDl4UxP6qmBf+dXC1
UplzVb52XwB7CowbXMLfLSEnljGIp/gkC0d081XafNo8TaeZJvFkQpJPSPNXVLaY
QDt+53+T7k2v0IlHsLuRM56AmYCa1i2w2H+qV66U+F1g4x9jRVu1NTXwVxNWBmNG
HrFK0YzoaMgF6f46PtkC+zGB4SrZ+G2fqV6rnySpJPSDO6DlEZuNzpmZgsNcl+ua
JEsRTSp/AgMBAAECggEBAMPvLRKVHOOGWCh6NRM2OzqsIKesaF6nlBokZSZovGjX
3jJSZD+pizBo5UVs7JiBfNAV4dR8v5rV+bV0cmGQJSmsKWdjmB3GtNLOBJTmkaX9
cpDkvNBoFMNSWaGmEnxHmntagwvXkEXO8a88MJtGoLsTqrzfapwSWAU1sG/CV7gc
6P6pOdldFS7TGeOQJK7pEvBdrPgN0sQ9LBbACxOWGOSfkv1i2bPgwCIuMBe5JV03
/ZfdCY7XwkCfy91EVRNQX/caYJ+EXxNUNHD4xN7us5H4guCcgZYz8G3xqeb9Vqr8
Z9gL9Ii7fMpOaciO0YgEkiplnYNu2KB40S7d5J0XG5ECgYEA/CBkbYLT1VzgJRDz
+QvALFpVF4u4ga5tAtDA8MqVM/YL4ay0xiJO6O9HZdwTLYbqnrHf2IfqrFw6ol25
Ya4cHVZutUtlXIf7Zv4/HzZh0aJfSnMs5eOg1BSuC1bXph5PWrOXmBSTZm/J615J
9TzyLJTlgACgB2lX1xiTRx+UShcCgYEA+vY+LF2eEpy0FdbbmFBrZbpyz9vZHvr+
PTpr346a9FJtSBm6Am5/4DBAvKbTHqHe5pLeNu9o1uqngUQtCS80N0MqLY6LLdm9
TxtT0Rg1R1hd+UnBTqBa7EJhHb+pAS+jrdnxKZhzOn4Rq1WJT1calDb5T9+sPYXh
r2KIUiTrq9kCgYEAwfVlbP3VWvGdGcbF+ZR5nWVMytVY9qKqCB1yIIuoZpXlJBKJ
61bfX8EcKxc3xbFh8v2h1+EPvtMg5GG3yJZ52HPyrRO4gYu28s+q3acnb287YXnj
U2NfCWhzUBPZyFjO8VbxyzQhBRAAxUn/GWNuZq+RMnzIn4sB4V5thqyblrcCgYEA
vmiua4LsODrk99z45+u8UIbSLZskdTkCRPpadlgAgXc4qwe59bZZF4QE2h3I+Ojf
8hlkuFGVPdr0FEPh16IVAAjZq48HUlZuJ+MYCQFRCzyksEuhe0J3OeJzRNryI5A9
o95D98dPRgX46gIQGD6CUAoVxuByEovN2//qZkjU9qECgYBTGQALqhaSSZUAyPaJ
LIU0rIaMxiyLBc2bDtFLUSmSfvOA83BZCRN452obnM3pgQYTD5/AvultHlJwraVL
1O9CH97AwrE9TUsc+hlrIVGGZFUHfZr2Buj5TZUFOR+/gKszBcgpvROwnqklTsId
tZ4umdUY0ubwdxMbJQU3S2pX2A==
-----END PRIVATE KEY-----`

const PRIV_BPD_PEM = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLhEUdMTZ3/dJz
FEE5zvwulheeHaoLI9WxPB9Xm4tnKMWWn0aS0EtNZWyAU9HQV6VEY0JoE4f8f3g6
hMkdMcmN37eUJ7imef3HIBenVQNUZnyABIOAdLuaetClNlWm5944+H+BZFnpudCO
+Hj1U2W+U7T5C3pl5T8+GhxCsgqzUvXKRewNIMOzDnmrxCwqb/M8xIjDvx4oGN1o
BFnPj8rbd0/arsAPdcUZiYRb6UXRNCtbBGjCNInZ91t+MND8S52irVmd47Ow3FoZ
GjCUAj4rNzEHRh06XjNMMk77G85y1mYM7nn1hUhf3l0DUN8TwGhC9vVg+M+tt/fr
l7y3xtoHAgMBAAECggEACQQ1qart/lfs9HM/xodgjdHRfwxSZcbzJzSCMPfvr6TT
SC6LSmLXCzlEmtTb1U6kwEhjf0fqPOoK0hDi9huoEdSJBhPSbvG1qBZIZf3ytVEL
EALjLpQ9YYUybDdhiRD5u+1qfLmM8Dluv37LoRbOSaXcvTHgfNYwvJgci2nm5nXg
t8UiU8OHXgV8GHdLm9GbBB3bB00nacRznfuxBNem2nCDvDnFqSEV0jWjugj6psdM
83h9Ye4HB77y7OpaofpLsOJQFZYZRNBmw1ypdQrnbLKwdKLk869VRI7ZwHdqkZHw
J+sLpPtwCC2cdajRPVNYsGt0yRchGg0h9+7y4TQhTQKBgQDssg/9897n557giRHj
3MSibvxASeHJ+G8qgszr7W5+Y05Bgd7bZrIPN/KNEJ3ADbnt5mA0UIgGLRIvoJE4
exnodmhueVTZCIQq6JEed/GVbNqAMejy+byeJM6KNkFbhd/ypf+MCzKURc9w2IYA
sYU46rgIpMwSpAgUSKywKQ2oWwKBgQDcHXhE3cy2wlLM8H5YE17MkvwR4qNLYEzd
1vMvlq+hi3srpF9mJQ/OGhDSYTsmj9vHgUyIhUytfNg9Sog6AHkcLt6wV7lonjvr
UeoHbE+/TlUuzIQgz7R/yEndE2XA6affM7BpZOpajjV8CSzsCZG40k24GALAuZvI
6kxy3V6kxQKBgQC3zosmrdQDCNZTDX6MEavNbByNnBIv8rH5NDwIVohAs8NYkY7L
mFNcCBlePHIUa1Rgj09UMNmA2k1OGQXM86Op5xGwAJ7IL5nbbGENZR2A6VhAxwFc
dl1n/bM6l2lntm2zk/7/9M4hYJj3y907+p83FOc3JyqmqyTvA4S/BBJsEwKBgQCi
ds3yZpNWwY9D3K4kbAeoj0SmHtXQKMATbTgJg/sWDVFYIPaY+fn0caDA5ys1hzD8
zB6lFV5HHsKsWnq59OdvOdj754PeCAzJ36gQ2ozx8utEo4dSgHwFZNu/5TVRciSJ
xikLYYToWdZ4On2Bqn54ICFlI7PEdDrbzLOohGP60QKBgQDbG6zu4XXDO3EaZFr9
VTllOVESELjc6V6OWo0mBnKXylQ4j/ps7kY9Imz7jpyi22dtLfqwzirmi/lsIERv
MswoO11LenV8bbIamN/vBfLJKKYGen+lOerjBDSJhIWyPN1VrczVKm5Y0bGP4qgy
Utb/zmklYi3CbDFQwlX02oS4bQ==
-----END PRIVATE KEY-----`

// ── Constants ────────────────────────────────────────────────────────────────
const BPD_HASHCODE = 'p91wrswK'

// ── Helpers ──────────────────────────────────────────────────────────────────
function b64ToBytes(b64: string): Uint8Array {
  // handle base64url too
  const std = b64.replace(/-/g, '+').replace(/_/g, '/')
  const pad = std.padEnd(std.length + (4 - std.length % 4) % 4, '=')
  const bin = atob(pad)
  return Uint8Array.from(bin, c => c.charCodeAt(0))
}

function bytesToB64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

function hexEncode(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function strToBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s)
}

// ── § 0 — Pure-JS MD5 (Web Crypto tidak support MD5) ────────────────────────
export function md5(input: string): string {
  function safeAdd(x: number, y: number) { const lsw=(x&0xFFFF)+(y&0xFFFF); return (((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF) }
  function bitRotateLeft(num: number, cnt: number) { return (num<<cnt)|(num>>>(32-cnt)) }
  function md5cmn(q:number,a:number,b:number,x:number,s:number,t:number){return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}
  function md5ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&c)|((~b)&d),a,b,x,s,t)}
  function md5gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t)}
  function md5hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(b^c^d,a,b,x,s,t)}
  function md5ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(c^(b|(~d)),a,b,x,s,t)}
  function utf8Encode(s:string){
    const bytes:number[]=[]
    for(let i=0;i<s.length;i++){
      const c=s.charCodeAt(i)
      if(c<128)bytes.push(c)
      else if(c<2048)bytes.push((c>>6)|192,(c&63)|128)
      else if(c<65536)bytes.push((c>>12)|224,((c>>6)&63)|128,(c&63)|128)
      else bytes.push((c>>18)|240,((c>>12)&63)|128,((c>>6)&63)|128,(c&63)|128)
    }
    return bytes
  }
  const bytes = utf8Encode(input)
  // padding
  const msgLen = bytes.length
  bytes.push(0x80)
  while(bytes.length % 64 !== 56) bytes.push(0)
  const bitLen = msgLen * 8
  for(let i=0;i<8;i++) bytes.push(i<4?(bitLen>>>(i*8))&0xFF:(bitLen/0x100000000>>>(i*4)*8)&0xFF)
  // process blocks
  let a=0x67452301,b=0xEFCDAB89,c=0x98BADCFE,d=0x10325476
  for(let i=0;i<bytes.length;i+=64){
    const M:number[]=[]
    for(let j=0;j<16;j++) M[j]=bytes[i+j*4]|(bytes[i+j*4+1]<<8)|(bytes[i+j*4+2]<<16)|(bytes[i+j*4+3]<<24)
    let [aa,bb,cc,dd]=[a,b,c,d]
    a=md5ff(a,b,c,d,M[0],7,-680876936);d=md5ff(d,a,b,c,M[1],12,-389564586);c=md5ff(c,d,a,b,M[2],17,606105819);b=md5ff(b,c,d,a,M[3],22,-1044525330)
    a=md5ff(a,b,c,d,M[4],7,-176418897);d=md5ff(d,a,b,c,M[5],12,1200080426);c=md5ff(c,d,a,b,M[6],17,-1473231341);b=md5ff(b,c,d,a,M[7],22,-45705983)
    a=md5ff(a,b,c,d,M[8],7,1770035416);d=md5ff(d,a,b,c,M[9],12,-1958414417);c=md5ff(c,d,a,b,M[10],17,-42063);b=md5ff(b,c,d,a,M[11],22,-1990404162)
    a=md5ff(a,b,c,d,M[12],7,1804603682);d=md5ff(d,a,b,c,M[13],12,-40341101);c=md5ff(c,d,a,b,M[14],17,-1502002290);b=md5ff(b,c,d,a,M[15],22,1236535329)
    a=md5gg(a,b,c,d,M[1],5,-165796510);d=md5gg(d,a,b,c,M[6],9,-1069501632);c=md5gg(c,d,a,b,M[11],14,643717713);b=md5gg(b,c,d,a,M[0],20,-373897302)
    a=md5gg(a,b,c,d,M[5],5,-701558691);d=md5gg(d,a,b,c,M[10],9,38016083);c=md5gg(c,d,a,b,M[15],14,-660478335);b=md5gg(b,c,d,a,M[4],20,-405537848)
    a=md5gg(a,b,c,d,M[9],5,568446438);d=md5gg(d,a,b,c,M[14],9,-1019803690);c=md5gg(c,d,a,b,M[3],14,-187363961);b=md5gg(b,c,d,a,M[8],20,1163531501)
    a=md5gg(a,b,c,d,M[13],5,-1444681467);d=md5gg(d,a,b,c,M[2],9,-51403784);c=md5gg(c,d,a,b,M[7],14,1735328473);b=md5gg(b,c,d,a,M[12],20,-1926607734)
    a=md5hh(a,b,c,d,M[5],4,-378558);d=md5hh(d,a,b,c,M[8],11,-2022574463);c=md5hh(c,d,a,b,M[11],16,1839030562);b=md5hh(b,c,d,a,M[14],23,-35309556)
    a=md5hh(a,b,c,d,M[1],4,-1530992060);d=md5hh(d,a,b,c,M[4],11,1272893353);c=md5hh(c,d,a,b,M[7],16,-155497632);b=md5hh(b,c,d,a,M[10],23,-1094730640)
    a=md5hh(a,b,c,d,M[13],4,681279174);d=md5hh(d,a,b,c,M[0],11,-358537222);c=md5hh(c,d,a,b,M[3],16,-722521979);b=md5hh(b,c,d,a,M[6],23,76029189)
    a=md5hh(a,b,c,d,M[9],4,-640364487);d=md5hh(d,a,b,c,M[12],11,-421815835);c=md5hh(c,d,a,b,M[15],16,530742520);b=md5hh(b,c,d,a,M[2],23,-995338651)
    a=md5ii(a,b,c,d,M[0],6,-198630844);d=md5ii(d,a,b,c,M[7],10,1126891415);c=md5ii(c,d,a,b,M[14],15,-1416354905);b=md5ii(b,c,d,a,M[5],21,-57434055)
    a=md5ii(a,b,c,d,M[12],6,1700485571);d=md5ii(d,a,b,c,M[3],10,-1894986606);c=md5ii(c,d,a,b,M[10],15,-1051523);b=md5ii(b,c,d,a,M[1],21,-2054922799)
    a=md5ii(a,b,c,d,M[8],6,1873313359);d=md5ii(d,a,b,c,M[15],10,-30611744);c=md5ii(c,d,a,b,M[6],15,-1560198380);b=md5ii(b,c,d,a,M[13],21,1309151649)
    a=md5ii(a,b,c,d,M[4],6,-145523070);d=md5ii(d,a,b,c,M[11],10,-1120210379);c=md5ii(c,d,a,b,M[2],15,718787259);b=md5ii(b,c,d,a,M[9],21,-343485551)
    a=safeAdd(a,aa);b=safeAdd(b,bb);c=safeAdd(c,cc);d=safeAdd(d,dd)
  }
  function toHex(n:number){let s='';for(let i=0;i<4;i++)s+=((n>>>(i*8))&0xFF).toString(16).padStart(2,'0');return s}
  return toHex(a)+toHex(b)+toHex(c)+toHex(d)
}

// ── § 1 — AES Key Derivation (Gio_CreateKeyAndIv) ───────────────────────────
export async function deriveAesKeys(clientID: string, timeStamp: string) {
  const lastEight = timeStamp.slice(-8)           // 'HH:MM:SS'
  const times = lastEight.split(':').map(Number)  // [HH, MM, SS]

  // HMAC-SHA512(key=timeStamp, msg=clientID) — matches PHP convention
  const keyMat = await crypto.subtle.importKey(
    'raw', strToBytes(timeStamp), { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']
  )
  const keyBytes = new Uint8Array(await crypto.subtle.sign('HMAC', keyMat, strToBytes(clientID)))
  const keyLen = keyBytes.length // 64

  const kStart  = times[0]
  const ivStart = Math.floor((keyLen + times[1]) / 2) - 16
  const csStart = Math.floor((keyLen + times[2]) / 3) - 8

  const aesKey = bytesToB64(keyBytes.slice(kStart,  kStart  + 32))
  const aesIv  = bytesToB64(keyBytes.slice(ivStart, ivStart + 16))
  const aesCs  = bytesToB64(keyBytes.slice(csStart, csStart + 8))

  return { aesKey, aesIv, aesCs, times, kStart, ivStart, csStart,
    debug: { lastEight, times, kStart, ivStart, csStart,
      keyBytesHex: hexEncode(keyBytes).slice(0, 32) + '...' } }
}

// ── § 2 — AES-256-CBC Encrypt ────────────────────────────────────────────────
export async function aesEncrypt(plaintext: string, aesKeyB64: string, aesIvB64: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', b64ToBytes(aesKeyB64), 'AES-CBC', false, ['encrypt'])
  const iv  = b64ToBytes(aesIvB64)
  const enc = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, strToBytes(plaintext))
  return bytesToB64(enc)
}

// ── § 3 — AES-256-CBC Decrypt ────────────────────────────────────────────────
export async function aesDecrypt(cipherB64: string, aesKeyB64: string, aesIvB64: string): Promise<string | null> {
  try {
    const key = await crypto.subtle.importKey('raw', b64ToBytes(aesKeyB64), 'AES-CBC', false, ['decrypt'])
    const iv  = b64ToBytes(aesIvB64)
    const dec = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, b64ToBytes(cipherB64))
    return new TextDecoder().decode(dec)
  } catch { return null }
}

// ── § 4 — DID Decode (Gio_DecryptDID) ───────────────────────────────────────
export function decodeDID(did: string) {
  const fix  = did.endsWith('==') ? '==' : did.endsWith('=') ? '=' : ''
  const col  = did.substring(7, 13)
  const col1 = parseInt(col[0]) * 10 + col.charCodeAt(1) - 64
  const col2 = 100 + parseInt(col[2]) * 10 + col.charCodeAt(3) - 64
  const col3 = 100 + parseInt(col[4]) * 10 + col.charCodeAt(5) - 64

  const lenSeg = did.substring(16, 20)
  const len1   = lenSeg.charCodeAt(0) - 64
  const len2   = lenSeg.charCodeAt(1) - 64
  const len3   = parseInt(lenSeg.slice(2))

  const idd = did.substring(col1, col1 + len1)
             + did.substring(col2, col2 + len2)
             + did.substring(col3, col3 + len3)

  const rawDecoded = atob((idd + fix).replace(/-/g, '+').replace(/_/g, '/'))
  const parts      = rawDecoded.split('|')
  return {
    app: parts[0] || '', clientID: parts[1] || '', regTime: parts[2] || '',
    rawDecoded, parts,
    debug: { col1, col2, col3, len1, len2, len3, idd: idd.slice(0, 20) + '...' }
  }
}

// ── § 5 — DID Encode ────────────────────────────────────────────────────────
export function encodeDID(clientID: string, timestamp: string, appName = 'Seminyak'): string {
  const plain  = `${appName}|${clientID}|${timestamp}`
  const b64raw = btoa(plain)
  const fix    = b64raw.endsWith('==') ? '==' : b64raw.endsWith('=') ? '=' : ''
  const b64    = b64raw.slice(0, b64raw.length - fix.length)
  const b64Len = b64.length

  const col1 = 20, col2 = 104, col3 = 172
  const partLen = Math.floor(b64Len / 3)
  const len1 = partLen, len2 = partLen, len3 = b64Len - len1 - len2

  const seg1 = b64.slice(0, len1)
  const seg2 = b64.slice(len1, len1 + len2)
  const seg3 = b64.slice(len1 + len2)

  const encCol = (v: number) => String(Math.floor(v / 10)) + String.fromCharCode((v % 10) + 64)
  const colStr = encCol(col1) + encCol(col2 - 100) + encCol(col3 - 100)
  const lenStr = String.fromCharCode(len1 + 64) + String.fromCharCode(len2 + 64) + String(len3).padStart(2, '0')

  const totalLen = Math.max(col3 + len3, 200)
  const out = new Array(totalLen + 50).fill('A')

  out[7]=colStr[0]; out[8]=colStr[1]; out[9]=colStr[2]; out[10]=colStr[3]; out[11]=colStr[4]; out[12]=colStr[5]
  out[16]=lenStr[0]; out[17]=lenStr[1]; out[18]=lenStr[2]; out[19]=lenStr[3]

  for (let i = 0; i < seg1.length; i++) out[col1 + i] = seg1[i]
  for (let i = 0; i < seg2.length; i++) out[col2 + i] = seg2[i]
  for (let i = 0; i < seg3.length; i++) out[col3 + i] = seg3[i]

  return out.join('').slice(0, col3 + len3) + fix
}

// ── § 6 — JWT Decode ────────────────────────────────────────────────────────
export function decodeJWT(jwt: string) {
  const parts = jwt.split('.')
  if (parts.length < 2) return { error: 'Bukan format JWT valid' }
  try {
    const header  = JSON.parse(atob(parts[0].replace(/-/g,'+').replace(/_/g,'/')))
    const payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')))
    return { header, payload, signatureB64: parts[2] || '',
      raw: { headerB64: parts[0], payloadB64: parts[1] } }
  } catch(e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

// ── § 6b — JWT Create (RS256) ────────────────────────────────────────────────
async function pemToDer(pem: string): Promise<ArrayBuffer> {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')
  return b64ToBytes(b64).buffer
}

export async function createJWT(transNo: string, transTime: string, pemKey = PRIV_LPD_PEM): Promise<string> {
  const header  = btoa(JSON.stringify({ trans_no: transNo, alg: 'RS256' }))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'')
  const payload = btoa(JSON.stringify({ trans_time: transTime }))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'')
  const msg = `${header}.${payload}`

  const der  = await pemToDer(pemKey)
  const key  = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const sig  = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, strToBytes(msg))
  const sigB64 = bytesToB64(sig).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'')
  return `${msg}.${sigB64}`
}

// ── § 7 — X-SIGNATURE / X-PARTNER-ID (HMAC-SHA512) ─────────────────────────
export async function generateSignature(token: string, timeStamp: string, aesCsB64: string): Promise<string> {
  const cs  = b64ToBytes(aesCsB64)
  const msg = strToBytes(`${token}:${timeStamp}`)
  const key = await crypto.subtle.importKey('raw', cs, { name: 'HMAC', hash: 'SHA-512' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, msg)
  return bytesToB64(sig)
}

export function decodeSignature(sigB64: string): string {
  return hexEncode(b64ToBytes(sigB64))
}

// ── § 9 — Hash Codes ────────────────────────────────────────────────────────
export async function generateHashCodeCheck(p: Record<string, string>): Promise<string> {
  const str = `%${p.fromAcc}#${p.amount}@${p.dateTime}^${p.refNo}*${p.destBank}~${p.destAcc}|${BPD_HASHCODE}%`
  return hexEncode(await crypto.subtle.digest('SHA-256', strToBytes(str)))
}

export async function generateHashCodePosting(p: Record<string, string>): Promise<string> {
  const str = `@${p.fromAcc}|${p.amount}~${p.dateTime}*${p.refNo}^${p.destBank}#${p.destAcc}(${p.destName})${BPD_HASHCODE}@`
  return hexEncode(await crypto.subtle.digest('SHA-256', strToBytes(str)))
}

export async function generateHashCodeLPD(p: Record<string, string>): Promise<string> {
  const str = `{${p.nominal}*${p.norekFrom}^${p.norekTo}%${p.nameFrom}#${p.nameTo}@${BPD_HASHCODE}}`
  return hexEncode(await crypto.subtle.digest('SHA-256', strToBytes(str)))
}

// ── § 10 — iOS Token Signature ───────────────────────────────────────────────
export async function generateIosTokenSig(timestamp: string) {
  const clientStamp = hexEncode(await crypto.subtle.digest('SHA-256', strToBytes(`Seminyak|${timestamp}`)))
  const der = await pemToDer(PRIV_LPD_PEM)
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, strToBytes(clientStamp))
  return { signature: bytesToB64(sig), timestamp, clientStamp }
}

// ── § 11 — SNAP Token Signature ──────────────────────────────────────────────
export async function generateSnapTokenSig(clientKey: string, timestamp: string) {
  const msg = `${clientKey}|${timestamp}`
  const der = await pemToDer(PRIV_BPD_PEM)
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, strToBytes(msg))
  return { signature: bytesToB64(sig), clientKey, timestamp, message: msg }
}

// ── § 12 — Timestamps ───────────────────────────────────────────────────────
export function nowJakarta(): string {
  const now   = new Date()
  const local = new Date(now.getTime() + 7 * 3600_000)
  return local.toISOString().replace('T', ' ').slice(0, 19)
}

export function nowJakartaISO(): string {
  const now   = new Date()
  const local = new Date(now.getTime() + 7 * 3600_000)
  return local.toISOString().slice(0, 19) + '+07:00'
}

// ── § 13 — X-REFERENCE ──────────────────────────────────────────────────────
export function generateReference(prefix = 'SMY'): string {
  const now    = new Date(new Date().getTime() + 7 * 3600_000)
  const HHMMSS = now.toISOString().slice(11, 19).replace(/:/g, '').slice(0, 6)
  const rand   = String(Math.floor(Math.random() * 9000) + 1000)
  const date   = now.toISOString().slice(0, 10).replace(/-/g, '')
  return `${prefix}${HHMMSS}${rand}O1012${date.slice(4)}`
}

// ── § 14 — Build Transfer Request ────────────────────────────────────────────
export async function buildBankTransferRequest(opts: Record<string, string>) {
  const ts    = opts.timestamp || nowJakarta()
  const refNo = opts.refNo    || generateReference()

  const encFromAcc  = await aesEncrypt(opts.fromAcc,         opts.aesKey, opts.aesIv)
  const encAmount   = await aesEncrypt(String(opts.amount),  opts.aesKey, opts.aesIv)
  const encDateTime = await aesEncrypt(opts.dateTime,        opts.aesKey, opts.aesIv)
  const encToName   = await aesEncrypt(opts.destName || '',  opts.aesKey, opts.aesIv)

  let hashRaw: string, encToAcc: string, encHashCode: string | null

  if (opts.step === 'posting') {
    hashRaw     = await generateHashCodePosting({ ...opts, refNo })
    encToAcc    = await aesEncrypt(`${opts.destBank}-${opts.destAcc}`,        opts.aesKey, opts.aesIv)
    encHashCode = await aesEncrypt(hashRaw, opts.aesKey, opts.aesIv)
  } else {
    hashRaw     = await generateHashCodeCheck({ ...opts, refNo })
    encToAcc    = await aesEncrypt(`${opts.destBank}-${opts.destAcc}-${hashRaw}`, opts.aesKey, opts.aesIv)
    encHashCode = null
  }

  const jwt       = await createJWT(refNo, nowJakartaISO())
  const signature = await generateSignature(jwt, ts, opts.aesCs)
  const partnerID = signature

  const body = {
    from_acc:  encFromAcc, to_acc:  encToAcc,
    amount:    encAmount,  date_time: encDateTime,
    to_name:   encToName,  hash_code: encHashCode || '',
    remark:    opts.remark || '',
  }
  const headers = {
    'Content-Type':    'application/json',
    'Authorization':   jwt,
    'X-TIMESTAMP':     ts,
    'X-SIGNATURE':     signature,
    'X-PARTNER-ID':    partnerID,
    'X-CLIENT-ID':     opts.didEncoded || '',
    'X-REFERENCE':     refNo,
    'X-Forwarded-For': '34.50.74.78',
    'X-Real-IP':       '34.50.74.78',
  }
  return { headers, body, url: `${opts.baseUrl || 'https://lpdseminyak.biz.id:8000'}/api/smart/transfer/bank/post`,
    refNo, ts, debug: { hashRaw, step: opts.step || 'check' } }
}

// ── § 15 — Decrypt Body ─────────────────────────────────────────────────────
export async function decryptRequestBody(body: Record<string, string>, aesKey: string, aesIv: string) {
  const result: Record<string, string | null> = {}
  for (const [k, v] of Object.entries(body)) {
    if (v && typeof v === 'string') {
      result[k] = await aesDecrypt(v, aesKey, aesIv)
    }
  }
  return result
}

// ── Main dispatcher ──────────────────────────────────────────────────────────
export async function handleCryptoOp(params: Record<string, string>): Promise<{ ok: boolean; op?: string; result?: unknown; error?: string }> {
  const op = params.op
  try {
    let result: unknown

    if (op === 'keygen') {
      result = await deriveAesKeys(params.clientID, params.timestamp)

    } else if (op === 'encrypt') {
      const encrypted = await aesEncrypt(params.plaintext, params.aesKey, params.aesIv)
      result = { encrypted, plaintext: params.plaintext }

    } else if (op === 'decrypt') {
      const decrypted = await aesDecrypt(params.ciphertext, params.aesKey, params.aesIv)
      result = { decrypted, ciphertext: params.ciphertext }

    } else if (op === 'did-decode') {
      result = decodeDID(params.did)

    } else if (op === 'did-encode') {
      const encoded = encodeDID(params.clientID, params.timestamp, params.appName || 'Seminyak')
      result = { encoded, clientID: params.clientID, timestamp: params.timestamp }

    } else if (op === 'jwt-decode') {
      result = decodeJWT(params.jwt)

    } else if (op === 'hashcode') {
      const step = params.step || 'check'
      let hash: string
      if      (step === 'posting') hash = await generateHashCodePosting(params)
      else if (step === 'lpd')     hash = await generateHashCodeLPD(params)
      else                          hash = await generateHashCodeCheck(params)
      const bh = BPD_HASHCODE
      result = { hash, step,
        formula: step === 'posting'
          ? `SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")${bh}@")`
          : `SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|${bh}%")` }

    } else if (op === 'reference') {
      const refs: string[] = []
      for (let i = 0; i < (parseInt(params.count) || 3); i++) refs.push(generateReference(params.prefix || 'SMY'))
      result = { references: refs }

    } else if (op === 'signature') {
      const sig = await generateSignature(params.token, params.timestamp, params.aesCs)
      result = { signature: sig }

    } else if (op === 'sig-decode') {
      const hex = decodeSignature(params.signature)
      result = { hex, length: hex.length }

    } else if (op === 'ios-token-sig') {
      result = await generateIosTokenSig(params.timestamp || nowJakarta())

    } else if (op === 'snap-token-sig') {
      result = await generateSnapTokenSig(params.clientKey || 'LPD-SEMINYAK-001', params.timestamp || nowJakartaISO())

    } else if (op === 'build-transfer') {
      result = await buildBankTransferRequest({
        ...params,
        timestamp: params.timestamp || nowJakarta(),
        refNo:     params.refNo     || generateReference(),
      })

    } else if (op === 'decrypt-body') {
      const body = JSON.parse(params.body || '{}')
      result = { decrypted: await decryptRequestBody(body, params.aesKey, params.aesIv) }

    } else if (op === 'timestamp') {
      result = { jakarta: nowJakarta(), jakartaISO: nowJakartaISO(), utc: new Date().toISOString() }

    } else {
      return { ok: false, error: `Unknown operation: ${op}` }
    }

    return { ok: true, op, result }
  } catch (e: unknown) {
    return { ok: false, op, error: e instanceof Error ? e.message : String(e) }
  }
}
