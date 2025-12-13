import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import flattenValidationErrors from '@/src/utils/functions/flattenClassValidationErrors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: false, // set true to throw on unknown fields
      transform: true, // auto-transform payloads to DTO types
      // Hides original input/value in errors (safer/cleaner responses)
      validationError: { target: false, value: false },

      // Choose between 400 or 422 here:
      exceptionFactory: (errors: ValidationError[]) => {
        const formatted = flattenValidationErrors(errors);

        // 400 (Nest default)
        return new BadRequestException(formatted);

        // Or 422 (popular with JSON:API, form UIs)
        // return new UnprocessableEntityException(formatted);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Commercor Admin API')
    .setDescription('Commercor API documentation for Dashboard')
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
