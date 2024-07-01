// src/infrastructure/services/awsS3FileUploadService.ts

import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { FileUploadService } from '../../adapters/services/fileUploadService';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export class AwsS3FileUploadService implements FileUploadService {
  private s3 = new AWS.S3();

  async uploadFileToS3(fileStream: Readable, fileName: string, contentType: string): Promise<string> {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ContentType: contentType,
      ACL: 'public-read', 
    };

    const data = await this.s3.upload(uploadParams).promise();
    return data.Location; 
  }
}
