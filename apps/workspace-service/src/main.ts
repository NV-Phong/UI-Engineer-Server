import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { WorkspaceServiceModule } from './workspace-service.module';
declare const module: any;

async function bootstrap() {
   const app = await NestFactory.create(WorkspaceServiceModule);
   app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
         host: process.env.HOST,
         port: Number(process.env.REDIS_PORT),
      },
   });
   await app.startAllMicroservices();
   Logger.log('🚀 WorkSpace-Service is running 🚀');
   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}
bootstrap();
