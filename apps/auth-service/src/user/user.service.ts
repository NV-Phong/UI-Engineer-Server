import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private usermodel: Model<User>) {}

   async FindByUserName(username: string): Promise<User> {
      const user = await this.usermodel.findOne({ username }).exec();
      if (!user) {
         throw new RpcException({
            message: `User with username "${username}" not found`,
         });
      }
      return user;
   }

   async FindByID(id: string): Promise<User> {
      if (!Types.ObjectId.isValid(id)) {
         throw new NotFoundException(`Invalid ID format: "${id}"`);
      }
      const user = await this.usermodel.findById(id).exec();
      if (!user) {
         throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return user;
   }
}
