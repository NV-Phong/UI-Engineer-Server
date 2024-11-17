import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['apps/auth-service/.env'],
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DATABASE),
      AuthModule,
   ],
   controllers: [AuthServiceController],
   providers: [AuthServiceService],
})
export class AuthServiceModule {}
