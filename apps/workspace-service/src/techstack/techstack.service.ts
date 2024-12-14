import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TechStack, TechStackDocument } from '../schema/techstack.schema';
import { Model } from 'mongoose';
import { CreateTechStackDTO } from './dto/create.dto';

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
}
