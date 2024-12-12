import { Controller } from '@nestjs/common';
import { TeamService } from './team.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTeamDTO } from './dto/create.dto';

@Controller()
export class TeamController {
   constructor(private readonly teamservice: TeamService) {}

   @MessagePattern('POST-team')
   async CreateNewTeam(
      @Payload() { createteamDTO }: { createteamDTO: CreateTeamDTO },
   ) {
      return await this.teamservice.CreateTeam(createteamDTO);
   }
}
