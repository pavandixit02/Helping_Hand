/**
 * Storage Interface defining the Universal Abstraction for S3, R2, and MinIO
 */
export interface StorageProvider {
  uploadFile(bucket: string, key: string, body: Buffer, mimeType: string): Promise<string>;
  getSignedUrl(bucket: string, key: string, expiresInMinutes?: number): Promise<string>;
  deleteFile(bucket: string, key: string): Promise<void>;
}

// AWS S3 Implementation
export class S3StorageProvider implements StorageProvider {
  async uploadFile(bucket: string, key: string, body: Buffer, mimeType: string): Promise<string> {
    // TODO: AWS SDK S3 PutObjectCommand
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }

  async getSignedUrl(bucket: string, key: string, expiresInMinutes: number = 60): Promise<string> {
    // TODO: getSignedUrl from @aws-sdk/s3-request-presigner
    return `https://${bucket}.s3.amazonaws.com/${key}?signed=true`;
  }

  async deleteFile(bucket: string, key: string): Promise<void> {
    // TODO: AWS SDK S3 DeleteObjectCommand
  }
}

// Global Storage Instance
export const storage: StorageProvider = new S3StorageProvider();
