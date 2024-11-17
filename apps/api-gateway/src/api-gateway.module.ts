import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['apps/api-gateway/.env'],
         isGlobal: true,
      }),
   ],
   controllers: [ApiGatewayController, AuthController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
