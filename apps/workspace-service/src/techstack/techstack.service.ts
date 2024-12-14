import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TechStack, TechStackDocument } from '../schema/techstack.schema';
import { Model } from 'mongoose';
import { CreateTechStackDTO } from './dto/create.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TechstackService {
   constructor(
      @InjectModel(TechStack.name)
      private readonly techstackModel: Model<TechStackDocument>,
   ) {}

   async CreateTechStack(
      createTechStackDTO: CreateTechStackDTO,
   ): Promise<TechStack> {
      return await new this.techstackModel({
         ...createTechStackDTO,
      }).save();
   }

   async findTechStackByID(id: string): Promise<TechStack> {
      const techStack = await this.techstackModel.findById(id).exec();
      if (!techStack) {
         throw new RpcException(`TechStack with ID ${id} not found`);
      }
      return techStack;
   }
}
