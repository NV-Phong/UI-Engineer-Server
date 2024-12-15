import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '../schema/team.schema';
import { CreateTeamDTO } from './dto/create.dto';

@Injectable()
export class TeamService {
   constructor(
      @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
   ) {}

   async CreateTeam(createTeamDTO: CreateTeamDTO): Promise<Team> {
      return await new this.teamModel({
         ...createTeamDTO,
         isDeleted: false,
         members: createTeamDTO.members.map((member) => ({
            IDUser: member.IDUser,
            leader: true,
            joinedAt: new Date(),
         })),
      }).save();
   }

   async FindTeamByIDUser(IDUser: string) {
      return await this.teamModel
         .find({
            'members.IDUser': IDUser,
            isDeleted: false,
         })
         .exec();
   }
}
