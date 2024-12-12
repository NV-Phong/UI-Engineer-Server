import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '../schema/team.schema';
import { TeamController } from './team.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
 ],
  providers: [TeamService],
  controllers: [TeamController]
})
export class TeamModule {}
