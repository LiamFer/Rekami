import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async upload(file: Express.Multer.File, userID: string) {
    return new Promise<UploadApiResponse | undefined>((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `RekamiApp/Users/Pictures`,
          public_id: `pfp${userID}`,
          resource_type: 'image',
        },
        (err, result) => {
          if (err) {
            rej(err);
          }
          res(result);
        },
      );
      let str = Readable.from(file.buffer);
      str.pipe(uploadStream);
    });
  }
}
