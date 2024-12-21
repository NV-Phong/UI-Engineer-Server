import {
   Body,
   Controller,
   Post,
   UseGuards,
   Request,
   Get,
   Param,
} from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { CreateIdeaDTO, CreateUILibraryDTO } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace/idea')
@UseGuards(AuthGuard('jwt'))
export class IdeaController {
   constructor(private readonly workspaceservice: ApiGatewayService) {}

   @Post()
   CreateNewUILibrary(@Body() createideaDTO: CreateIdeaDTO) {
      return this.workspaceservice.send('POST-idea', createideaDTO);
   }

   @Get(':IDTeam')
   GetIdeaByIDTeam(@Param('IDTeam') IDTeam: string) {
      return this.workspaceservice.send('GET-idea', IDTeam);
   }
}
