import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['apps/auth-service/.env'],
         isGlobal: true,
      }),
   ],
   controllers: [AuthServiceController],
   providers: [AuthServiceService],
})
export class AuthServiceModule {}
