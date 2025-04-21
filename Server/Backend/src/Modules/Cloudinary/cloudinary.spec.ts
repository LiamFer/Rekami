import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

async function getImageBufferFromURL(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

describe('Cloudinary (e2e)', () => {
  beforeAll(() => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  });

  it('Should upload user avatar', async () => {
    const buffer = await getImageBufferFromURL(
      'https://avatars.githubusercontent.com/u/122176731?s=400&u=aca58a82201ce32c518a9ef00187c9f6dca7c4d4&v=4',
    );

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'test',
          public_id: `${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    expect(result).toHaveProperty('secure_url');
  });

  it("Shouldn't upload user avatar with invalid buffer", async () => {
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      uploadStream.end(Buffer.from('ERROR STRING'));
    }).catch((err) => err);
    expect(result.name).toBe('Error');
  });
});
