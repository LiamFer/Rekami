import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

describe('RefreshAuthGuard (e2e)', () => {
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

  it('Should allow Refresh with valid refreshToken cookie', async () => {
    const validRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiOWZmMmFhLTQxZDYtNDVjOS1iNmI0LWZjYTRlOWVhOWRhZiIsImlhdCI6MTc0NTE3ODE5MCwiZXhwIjoxNzQ1MjY0NTkwfQ.eKxZ6I1n2I6Yj10HDr0x1-FJZNWLfNqUj7UlpSTMyd0"
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', [`refreshToken=${validRefreshToken}`])
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.message).toBe("Token Refreshed");
      });
  });

  it('Should deny Refresh with invalid refreshToken cookie', async () => {
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', [`refreshToken=invalidtoken`])
      .expect(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    await app.close();
  });
});
