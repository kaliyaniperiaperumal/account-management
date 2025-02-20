import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { CustomExceptionFilter } from './custom.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new CustomExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('Account Management')
    .setDescription('Multi tenant account management micro service')
    .setVersion('1.0')
    .addServer('http://localhost:4123/', 'Local environment')
    .addTag('AM')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger/account-management', app, document);

  await app.listen(process.env.PORT ?? 4123);
}
bootstrap();
