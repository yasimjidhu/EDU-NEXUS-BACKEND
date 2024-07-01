
import { Readable } from 'stream';

export interface FileUploadService {
  uploadFileToS3(fileStream: Readable, fileName: string, contentType: string): Promise<string>;
}
