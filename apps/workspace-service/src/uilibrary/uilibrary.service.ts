import { Injectable } from '@nestjs/common';
import { UILibrary, UILibraryDocument } from '../schema/uilibrary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UilibraryService {
   constructor(
      @InjectModel(UILibrary.name)
      private readonly techstackModel: Model<UILibraryDocument>,
   ) {}

   async CreateUILibrary(): Promise<UILibrary> {
      return;
   }
}
