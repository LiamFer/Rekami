import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {  HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

describe('LocalAuthGuard (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.use(helmet());
    await app.init();
  });

  it('Should Login with Valid Credentials', async () => {
    const validCredentials = { email: 'test@email.com', password: '123456' };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(validCredentials)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.message).toBe('Logged In');
      });
  });

  it('Should deny Login with Invalid Credentials', async () => {
    const invalidCredentials = { email: 'invalid@email.com', password: '123456' };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(invalidCredentials)
      .expect(HttpStatus.UNAUTHORIZED)
  });

  afterAll(async () => {
    await app.close();
  });
});
