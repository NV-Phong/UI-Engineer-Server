import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Idea, IdeaDocument } from '../schema/idea.schema';
import { Model } from 'mongoose';
import { CreateIdeaDTO } from './dto/create.dto';

@Injectable()
export class IdeaService {
   constructor(
      @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
   ) {}

   async CreateIdea(createIdeaDto: CreateIdeaDTO): Promise<Idea> {
      const newIdea = new this.ideaModel({
         ...createIdeaDto,
         isDeleted: false,
      });
      return newIdea.save();
   }

   async FindIdeaByIDTeam(IDTeam: string): Promise<Idea[]> {
      return this.ideaModel.find({ IDTeam, isDeleted: false }).exec();
   }
}
