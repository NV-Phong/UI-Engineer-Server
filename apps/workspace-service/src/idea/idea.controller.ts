import { Controller } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateIdeaDTO } from './dto/create.dto';

@Controller()
export class IdeaController {
   constructor(private readonly ideaservice: IdeaService) {}

   @MessagePattern('POST-idea')
   async CreateNewTeam(@Payload() createIdeaDTO: CreateIdeaDTO) {
      return await this.ideaservice.createIdea(createIdeaDTO);
   }
}
