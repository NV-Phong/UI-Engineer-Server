import { Controller } from '@nestjs/common';
import { TechstackService } from './techstack.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTechStackDTO } from './dto/create.dto';

@Controller()
export class TechstackController {
   constructor(private readonly techstackservice: TechstackService) {}

   @MessagePattern('POST-techstack')
   async CreateNewTechStack(@Payload() createtechstackDTO: CreateTechStackDTO) {
      return await this.techstackservice.CreateTechStack(createtechstackDTO);
   }

   @MessagePattern('GET-techstack-byID')
   async SearchByIDTechStack(@Payload() id: string) {
      return await this.techstackservice.findTechStackByID(id);
   }
}
