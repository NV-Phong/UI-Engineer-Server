import { Injectable } from '@nestjs/common';
import { UILibrary, UILibraryDocument } from '../schema/uilibrary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUILibraryDTO } from './dto/create.dto';

@Injectable()
export class UilibraryService {
   constructor(
      @InjectModel(UILibrary.name)
      private readonly uilibraryModel: Model<UILibraryDocument>,
   ) {}

   async CreateUILibrary(
      createuilibraryDTO: CreateUILibraryDTO,
   ): Promise<UILibrary> {
      return await new this.uilibraryModel({
         ...createuilibraryDTO,
         isDeleted: false,
         techStacks: createuilibraryDTO.IDtechStacks,
      }).save();
   }

   async FindUILibraryByIDTeam(idteam: string) {
      return this.uilibraryModel
         .find({ IDTeam: idteam, isDeleted: false })
         .exec();
   }
}
