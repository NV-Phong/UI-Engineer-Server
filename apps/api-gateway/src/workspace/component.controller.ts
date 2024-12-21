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
import { CreateComponentDTO, CreateIdeaDTO, CreateUILibraryDTO } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace/component')
@UseGuards(AuthGuard('jwt'))
export class ComponentController {
   constructor(private readonly workspaceservice: ApiGatewayService) {}

   @Post()
   CreateNewUILibrary(@Body() createcomponentDTO: CreateComponentDTO) {
      return this.workspaceservice.send('POST-component', createcomponentDTO);
   }

   @Get(':IDUILibrary')
   GetComponentByIDUILibrary(@Param('IDUILibrary') IDUILibrary: string) {
      return this.workspaceservice.send('GET-component', IDUILibrary);
   }
}
