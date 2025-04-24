import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async upload(file: Express.Multer.File) {
    return new Promise<UploadApiResponse | undefined>((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `RekamiApp/Users/Pictures`,
          public_id: `pfp_${uuidv4()}`,
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

  async delete(imageID) {
    return await cloudinary.uploader
      .destroy(`RekamiApp/Users/Pictures/${imageID}`)
      .then((res) => {
        if (res.result != 'ok') {
          throw new InternalServerErrorException("Couldn't delete Profile Picture")
        }
      });
  }
}
