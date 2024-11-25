import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: [
            'apps/auth-service/.env.development',
            'apps/auth-service/.env',
         ],
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DATABASE),
      AuthModule,
      UserModule,
   ],
   controllers: [AuthServiceController],
   providers: [AuthServiceService],
})
export class AuthServiceModule {}
