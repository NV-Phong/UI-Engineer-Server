import { Controller } from '@nestjs/common';
import { UilibraryService } from './uilibrary.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUILibraryDTO } from './dto/create.dto';

@Controller()
export class UilibraryController {
   constructor(private readonly uilibraryservice: UilibraryService) {}

   @MessagePattern('POST-uilibrary')
   async CreateNewUILibrary(@Payload() createuilibraryDTO: CreateUILibraryDTO) {
      return await this.uilibraryservice.CreateUILibrary(createuilibraryDTO);
   }

   @MessagePattern('GET-uilibrary')
   async GetUILibrary(@Payload() IDTeam: string) {
      return await this.uilibraryservice.FindUILibraryByIDTeam(IDTeam);
   }
}
