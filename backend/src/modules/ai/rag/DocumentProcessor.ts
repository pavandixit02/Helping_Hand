const pdfParse = require('pdf-parse');

export interface DocumentChunk {
  content: string;
  metadata: Record<string, any>;
}

export class DocumentProcessor {
  /**
   * Simple chunking strategy for raw text.
   * Splits by double newline (paragraphs) or fixed size.
   */
  chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + chunkSize));
      i += chunkSize - overlap;
    }
    return chunks;
  }

  async parsePDF(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text;
  }

  async processDocument(buffer: Buffer, mimeType: string, metadata: Record<string, any>): Promise<DocumentChunk[]> {
    let text = '';
    
    if (mimeType === 'application/pdf') {
      text = await this.parsePDF(buffer);
    } else if (mimeType === 'text/plain' || mimeType === 'text/markdown') {
      text = buffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported MIME type: ${mimeType}`);
    }

    const rawChunks = this.chunkText(text);
    
    return rawChunks.map((content, index) => ({
      content,
      metadata: {
        ...metadata,
        chunkIndex: index,
        mimeType,
      }
    }));
  }
}
