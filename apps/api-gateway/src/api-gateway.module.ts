import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['apps/api-gateway/.env'],
         isGlobal: true,
      }),
   ],
   controllers: [ApiGatewayController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
