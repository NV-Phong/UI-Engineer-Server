import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
   const app = await NestFactory.create(AuthServiceModule);
   app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
         host: process.env.HOST,
         port: Number(process.env.REDIS_PORT),
      },
   });
   await app.startAllMicroservices();
   Logger.log('🚀 Auth-Service is running 🚀');
   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}
bootstrap();
