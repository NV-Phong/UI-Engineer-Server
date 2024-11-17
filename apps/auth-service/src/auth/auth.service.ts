import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schema/user.schema';
import { RegisterDTO } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User.name) private usermodel: Model<UserDocument>,
   ) {}

   async Register(registerDTO: RegisterDTO): Promise<any> {
      const user = await this.usermodel.findOne({
         $or: [
            { username: registerDTO.username },
            { email: registerDTO.email },
         ],
      });

      if (user) {
         const errorMessage =
            user.username === registerDTO.username
               ? 'User with this UserName already exists'
               : 'User with this Email already exists';
         throw new RpcException({
            message: errorMessage,
            statusCode: HttpStatus.CONFLICT,
         });
      }

      const HashedPassword = await bcrypt.hash(registerDTO.password, 10);
      await new this.usermodel({
         ...registerDTO,
         password: HashedPassword,
      }).save();

      return {
         message: 'User registered successfully',
         user: { username: registerDTO.username, email: registerDTO.email },
      };
   }
}
