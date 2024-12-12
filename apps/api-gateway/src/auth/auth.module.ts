import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GithubStrategy } from 'apps/api-gateway/src/configuration/github.strategy';
import { JwtStrategy } from 'apps/api-gateway/src/configuration/jwt.strategy';
import { AuthController } from './auth.controller';
import { ApiGatewayService } from '../api-gateway.service';
@Module({
   imports: [
      JwtModule.register({
         secret: process.env.JWT_SECRET,
         signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
   ],
   controllers: [AuthController],
   providers: [JwtStrategy, GithubStrategy, ApiGatewayService],
})
export class AuthModule {}
