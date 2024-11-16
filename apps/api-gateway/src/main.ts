import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
   const app = await NestFactory.create(ApiGatewayModule);
   app.enableCors({
      origin: (origin, callback) => {
         if (!origin || origin.startsWith(process.env.CLIENT_CORS)) {
            callback(null, true);
         } else {
            callback(new Error('Not allowed by CORS'));
         }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
   });
   await app.listen(process.env.PORT);
   Logger.log(`🚀 API-Gateway is running on port http://localhost:${process.env.PORT} 🚀`)

   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}
bootstrap();
