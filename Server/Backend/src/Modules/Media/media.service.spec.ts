import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AuthService } from '../Auth/auth.service';

describe('Media Endpoints (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;
  let randomMedia: number;
  let mediaID: number;

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

  it('Should get user Media in Library', async () => {
    return request(app.getHttpServer())
      .get('/media/library')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);
  });

  it("Should add Media to user's library", async () => {
    return request(app.getHttpServer())
      .post('/media/library')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mediaId: randomMedia,
        mediaType: 'anime',
        status: 'paused',
        favorite: true,
      })
      .expect((res) => {
        mediaID = res.body.data.id;
        expect(HttpStatus.CREATED);
      });
  });

  it("Should not add Media to user's library", async () => {
    return request(app.getHttpServer())
      .post('/media/library')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mediaId: 1,
        mediaType: 'HQ',
        status: 'paused',
        favorite: true,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Should edit a Media', async () => {
    return request(app.getHttpServer())
      .patch(`/media/library/${mediaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        favorite: false,
        status: 'watched',
      })
      .expect(HttpStatus.OK);
  });

  it('Cannot edit Media with an Invalid Value', async () => {
    return request(app.getHttpServer())
      .patch(`/media/library/${mediaID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        favorite: false,
        status: 'rock',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Cannot edit Media that does not Exist', async () => {
    return request(app.getHttpServer())
      .patch(`/media/library/-1`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        favorite: false,
        status: 'watched',
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('Should Delete a Media from the Library', async () => {
    return request(app.getHttpServer())
      .delete(`/media/library/${mediaID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  it('Cannot Delete a Media that does not Exist', async () => {
    return request(app.getHttpServer())
      .delete('/media/library/-1')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
