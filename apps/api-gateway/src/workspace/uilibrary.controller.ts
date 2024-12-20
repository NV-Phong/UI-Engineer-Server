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
import { CreateUILibraryDTO } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace/ui-library')
@UseGuards(AuthGuard('jwt'))
export class UILibraryController {
   constructor(private readonly workspaceservice: ApiGatewayService) {}

   @Post()
   CreateNewUILibrary(@Body() createuilibraryDTO: CreateUILibraryDTO) {
      return this.workspaceservice.send('POST-uilibrary', createuilibraryDTO);
   }

   @Get(':IDTeam')
   GetUILibraryByIDTeam(@Param('IDTeam') IDTeam: string) {
      return this.workspaceservice.send('GET-uilibrary', IDTeam);
   }
}
