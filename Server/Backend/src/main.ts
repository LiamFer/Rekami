import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Pra fazer Validação do Body automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove os campos que não estão no DTO
      transform: true, // Transforma payloads para o tipo certo
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Rekami API')
    .setDescription('Documentação da API do Rekami')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
