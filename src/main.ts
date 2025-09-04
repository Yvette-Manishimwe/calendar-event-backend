import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) Allow CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend
      'https://calendar-event-pied.vercel.app/', // production frontend URL from .env
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  });

  // 2) Set global API prefix, but exclude the 'docs' path from it
  app.setGlobalPrefix('api', {
    exclude: ['docs'],
  });

  // 3) Swagger at /docs
  const config = new DocumentBuilder()
    .setTitle('Calendar Booking API')
    .setDescription('API for user authentication, events, and bookings')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
