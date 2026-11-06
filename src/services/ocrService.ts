import { recognize } from 'tesseract.js';

export interface OcrProgress {
  percent: number;
  message: string;
}

/**
 * Extracts raw ingredient text from an image using client-side Tesseract OCR
 */
export async function extractTextFromImage(
  imageSource: string | File | Blob,
  onProgress?: (progress: OcrProgress) => void
): Promise<string> {
  try {
    onProgress?.({ percent: 10, message: 'Initializing OCR engine...' });

    const result = await recognize(imageSource, 'eng', {
      logger: (message) => {
        if (message.status === 'recognizing text' && typeof message.progress === 'number') {
          onProgress?.({
            percent: Math.min(95, Math.round(15 + message.progress * 80)),
            message: `Extracting text (${Math.round(message.progress * 100)}%)...`
          });
        } else if (message.status) {
          onProgress?.({
            percent: 25,
            message: `Preparing image: ${message.status}...`
          });
        }
      }
    });

    onProgress?.({ percent: 100, message: 'Text recognition complete!' });

    // Clean up OCR text output
    let text = result.data.text || '';
    // Normalize line breaks and remove common scan artifacts
    text = text
      .replace(/\r\n/g, '\n')
      .replace(/\n+/g, ', ')
      .replace(/[|]/g, 'I')
      .replace(/\s+/g, ' ')
      .trim();

    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Could not recognize text from the image. Please try a clearer picture or enter ingredients manually.');
  }
}
