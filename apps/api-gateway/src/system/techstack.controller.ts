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
import { AuthGuard } from '@nestjs/passport';
import { CreateTechStackDTO } from './dto/create.dto';

@Controller('system/techstack')
@UseGuards(AuthGuard('jwt'))
export class TechStackController {
   constructor(private readonly techstackservice: ApiGatewayService) {}

   @Post()
   CreateTeam(@Body() createtechstackDTO: CreateTechStackDTO) {
      return this.techstackservice.send('POST-techstack', createtechstackDTO);
   }
   @Get(':id')
   SearchByIDTechStack(@Param('id') id: string) {
      return this.techstackservice.send('GET-techstack-byID', id);
   }
}
