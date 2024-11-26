import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { JwtStrategy } from '../configuration/jwt.strategy';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   controllers: [UserController],
   providers: [UserService, JwtStrategy],
   exports: [UserService],
})
export class UserModule {}
