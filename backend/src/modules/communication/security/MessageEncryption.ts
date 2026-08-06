import crypto from 'crypto';

// In production, this should be a 32-byte key stored securely in environment variables/KMS
const MOCK_SECRET_KEY = crypto.scryptSync('helping-hand-super-secret-key-2026', 'salt', 32);
const ALGORITHM = 'aes-256-gcm';

export class MessageEncryption {
  public static encrypt(text: string): { ciphertext: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, MOCK_SECRET_KEY, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return {
      ciphertext: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag
    };
  }

  public static decrypt(ciphertext: string, ivHex: string, authTagHex: string): string {
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, MOCK_SECRET_KEY, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
