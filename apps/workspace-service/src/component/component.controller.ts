import { Controller } from '@nestjs/common';
import { ComponentService } from './component.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateComponentDTO } from './dto/create.dto';

@Controller()
export class ComponentController {
   constructor(private readonly componentservice: ComponentService) {}

   @MessagePattern('POST-component')
   async CreateNewIdea(@Payload() createcomponentDTO: CreateComponentDTO) {
      return await this.componentservice.CreateComponent(createcomponentDTO);
   }
}
