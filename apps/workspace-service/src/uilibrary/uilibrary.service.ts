import { Injectable } from '@nestjs/common';
import { UILibrary, UILibraryDocument } from '../schema/uilibrary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUILibraryDTO } from './dto/create.dto';

@Injectable()
export class UilibraryService {
   constructor(
      @InjectModel(UILibrary.name)
      private readonly techstackModel: Model<UILibraryDocument>,
   ) {}

   async CreateUILibrary(
      createuilibraryDTO: CreateUILibraryDTO,
   ): Promise<UILibrary> {
      return await new this.techstackModel({
         ...createuilibraryDTO,
         techStacks: createuilibraryDTO.IDtechStacks,
      }).save();
   }
}
