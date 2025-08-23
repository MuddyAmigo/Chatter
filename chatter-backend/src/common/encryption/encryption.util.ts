import * as sodium from 'libsodium-wrappers';
/**
 * Secretbox (XSalsa20-Poly1305) utilities.
 * Stores ciphertext as base64(nonce || cipher).
 * Accepts ENV key with or without base64 padding.
 */

const EXPECTED_KEY_BYTES = 32; // crypto_secretbox_KEYBYTES

/**
 * Await libsodium readiness once.
 */
export async function sodiumReady() {
  await sodium.ready;
}

/**
 * Add missing base64 padding if needed.
 */
function addBase64Padding(b64: string): string {
  const mod = b64.length % 4;
  if (mod === 0) return b64;
  return b64 + '='.repeat(4 - mod);
}

/**
 * Try to decode a base64 key in multiple variants (padded / no padding).
 * Returns Uint8Array of raw key bytes or throws.
 */
function flexibleBase64Decode(b64: string): Uint8Array {
  // First try ORIGINAL (with padding)
  try {
    return sodium.from_base64(b64, sodium.base64_variants.ORIGINAL);
  } catch {
    // Try ORIGINAL_NO_PADDING after adding padding manually
    try {
      const padded = addBase64Padding(b64);
      return sodium.from_base64(padded, sodium.base64_variants.ORIGINAL);
    } catch {
      // Finally, attempt explicit NO_PADDING variant (for already trimmed)
      return sodium.from_base64(b64, sodium.base64_variants.ORIGINAL_NO_PADDING);
    }
  }
}

/**
 * Normalize a provided base64 key (with or without padding) into a canonical padded base64 string.
 */
export async function normalizeKeyBase64(possiblyUnpadded: string): Promise<string> {
  await sodiumReady();
  const raw = flexibleBase64Decode(possiblyUnpadded);
  if (raw.length !== EXPECTED_KEY_BYTES) {
    throw new Error(
      `Invalid key length. Expected ${EXPECTED_KEY_BYTES} bytes, got ${raw.length}`,
    );
  }
  // Re-encode in canonical padded ORIGINAL variant
  return sodium.to_base64(raw, sodium.base64_variants.ORIGINAL);
}

/**
 * Internal: decode + length check.
 */
function getKeyBytes(keyBase64: string): Uint8Array {
  const key = flexibleBase64Decode(keyBase64);
  if (key.length !== EXPECTED_KEY_BYTES) {
    throw new Error(
      `Invalid ENCRYPTION_KEY length. Expected ${EXPECTED_KEY_BYTES} bytes, got ${key.length}.`,
    );
  }
  return key;
}

/**
 * Encrypt plaintext -> base64(nonce || cipher).
 */
export async function encrypt(
  plainText: string,
  keyBase64: string,
): Promise<string> {
  await sodiumReady();
  const key = getKeyBytes(keyBase64);

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const msg = sodium.from_string(plainText);
  const cipher = sodium.crypto_secretbox_easy(msg, nonce, key);

  const combined = new Uint8Array(nonce.length + cipher.length);
  combined.set(nonce, 0);
  combined.set(cipher, nonce.length);

  return sodium.to_base64(combined, sodium.base64_variants.ORIGINAL);
}

/**
 * Decrypt base64(nonce || cipher) -> plaintext.
 */
export async function decrypt(
  payloadBase64: string,
  keyBase64: string,
): Promise<string> {
  await sodiumReady();
  const key = getKeyBytes(keyBase64);

  let combined: Uint8Array;
  try {
    combined = sodium.from_base64(
      payloadBase64,
      sodium.base64_variants.ORIGINAL,
    );
  } catch {
    // tolerate missing padding
    combined = sodium.from_base64(
      addBase64Padding(payloadBase64),
      sodium.base64_variants.ORIGINAL,
    );
  }

  const nonceLen = sodium.crypto_secretbox_NONCEBYTES;
  if (combined.length < nonceLen + sodium.crypto_secretbox_MACBYTES) {
    throw new Error('Ciphertext too short');
  }

  const nonce = combined.slice(0, nonceLen);
  const cipher = combined.slice(nonceLen);

  try {
    const msg = sodium.crypto_secretbox_open_easy(cipher, nonce, key);
    return sodium.to_string(msg);
  } catch (e) {
    throw new Error('Decryption failed (auth / integrity check failed)');
  }
}

/**
 * Safe decrypt returning null on any failure.
 */
export async function tryDecrypt(
  payloadBase64: string,
  keyBase64: string,
): Promise<string | null> {
  try {
    return await decrypt(payloadBase64, keyBase64);
  } catch {
    return null;
  }
}

/**
 * Generate a new random key (base64 padded).
 */
export async function generateKeyBase64(): Promise<string> {
  await sodiumReady();
  const k = sodium.crypto_secretbox_keygen();
  return sodium.to_base64(k, sodium.base64_variants.ORIGINAL);
}

/**
 * Validate key (throws if invalid).
 */
export async function validateKey(keyBase64: string): Promise<void> {
  await sodiumReady();
  getKeyBytes(keyBase64); // Will throw if invalid
}