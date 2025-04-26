import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AuthService } from '../Auth/auth.service';

describe('Interest Endpoints (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;
  let randomMedia: number;
  let interestID: number;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Remove os campos que não estão no DTO
        transform: true, // Transforma payloads para o tipo certo
      }),
    );
    await app.init();
    authService = moduleFixture.get<AuthService>(AuthService);
    randomMedia = Math.floor(Math.random() * 99999);
    // Gera o token real usando o AuthService
    token = (
      await authService.generateTokens('f3ccf500-914d-44c1-8a78-c17a06fbf581')
    ).token;
  });

  it('Should create new Interest', async () => {
    return request(app.getHttpServer())
      .post('/interest/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mediaId: randomMedia,
        mediaType: 'anime',
        value: 1,
      })
      .expect((res) => {
        interestID = res.body.data.id;
        expect(HttpStatus.CREATED);
      });
  });

  it('Should not create a new Interest', async () => {
    return request(app.getHttpServer())
      .post('/interest/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mediaId: 1,
        mediaType: 'HQ',
        value: 1,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should edit an Interest', async () => {
    return request(app.getHttpServer())
      .patch(`/interest/${interestID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 1,
      })
      .expect(HttpStatus.OK);
  });

  it('Cannot edit other User Interest', async () => {
    return request(app.getHttpServer())
      .patch('/interest/5')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 1,
      })
      .expect(HttpStatus.FORBIDDEN);
  });

  it('Cannot edit Interest with an Invalid Value', async () => {
    return request(app.getHttpServer())
      .patch(`/interest/${interestID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 22,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Cannot edit Interest that does not Exist', async () => {
    return request(app.getHttpServer())
      .patch('/interest/-1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 1,
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('Should Delete an Interest', async () => {
    return request(app.getHttpServer())
      .delete(`/interest/${interestID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  it('Cannot Delete other User Interest', async () => {
    return request(app.getHttpServer())
      .delete('/interest/5')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.FORBIDDEN);
  });

  it('Cannot Delete Interest that does not Exist', async () => {
    return request(app.getHttpServer())
      .delete('/interest/-1')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
