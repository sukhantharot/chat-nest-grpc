import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      endpoint: `https://${this.configService.get(
        'CLOUDFLARE_R2_ACCOUNT_ID',
      )}.r2.cloudflarestorage.com`,
      region: this.configService.get('CLOUDFLARE_R2_REGION'),
      credentials: {
        accessKeyId: this.configService.get('CLOUDFLARE_R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get(
          'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get('CLOUDFLARE_R2_BUCKET_NAME');
  }

  async uploadImage(file: Express.Multer.File) {
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();
    const fileKey = `${crypto.randomUUID()}.webp`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: webpBuffer,
      ContentType: 'image/webp',
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    return {
      url: `https://${this.bucketName}.r2.cloudflarestorage.com/${fileKey}`,
      key: fileKey,
    };
  }
}
