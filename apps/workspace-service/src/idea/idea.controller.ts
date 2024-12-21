import { Controller } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateIdeaDTO } from './dto/create.dto';

@Controller()
export class IdeaController {
   constructor(private readonly ideaservice: IdeaService) {}

   @MessagePattern('POST-idea')
   async CreateNewIdea(@Payload() createIdeaDTO: CreateIdeaDTO) {
      return await this.ideaservice.CreateIdea(createIdeaDTO);
   }

   @MessagePattern('GET-idea')
   async GetIdeaByIDTeam(@Payload() IDTeam: string) {
      return await this.ideaservice.FindIdeaByIDTeam(IDTeam);
   }
}
