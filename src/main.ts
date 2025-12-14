import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors({
    origin: true, // allows any origin; you can restrict later
    credentials: true,
  });


  app.setGlobalPrefix('api');

  // ✅ Swagger
  const config = new DocumentBuilder()
    .setTitle('Commercor Admin API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Render requires binding to 0.0.0.0 and using PORT env var
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
}

bootstrap();
