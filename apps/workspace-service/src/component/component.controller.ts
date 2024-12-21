import { Controller } from '@nestjs/common';
import { ComponentService } from './component.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateComponentDTO } from './dto/create.dto';

@Controller()
export class ComponentController {
   constructor(private readonly componentservice: ComponentService) {}

   @MessagePattern('POST-component')
   async CreateNewComponent(@Payload() createcomponentDTO: CreateComponentDTO) {
      return await this.componentservice.CreateComponent(createcomponentDTO);
   }

   @MessagePattern('GET-component')
   async GetComponentByIDUILibrary(@Payload() IDUILibrary: string) {
      return await this.componentservice.FindComponentByIDUILibrary(IDUILibrary);
   }
}
