import {
   Body,
   Controller,
   Post,
   UseGuards,
   Request,
   Get,
} from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { CreateTeamDTO } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace/team')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
   constructor(private readonly workspaceservice: ApiGatewayService) {}

   @Post()
   CreateTeam(@Body() createteamDTO: CreateTeamDTO, @Request() req) {
      return this.workspaceservice.send('POST-team', {
         createteamDTO: {
            ...createteamDTO,
            members: [{ IDUser: req.user.IDUser }],
         },
      });
   }

   @Get()
   FindTeamByIDUser(@Request() req) {
      return this.workspaceservice.send('GET-team-byIDUser', req.user.IDUser);
   }
}
