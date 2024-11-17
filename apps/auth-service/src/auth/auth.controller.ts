import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterDTO } from './dto/register.dto';

@Controller()
export class AuthController {
   constructor(private readonly authservice: AuthService) {}

   @MessagePattern('POST-user')
   async RegisterAccount(@Body() registerDTO: RegisterDTO) {
      return await this.authservice.Register(registerDTO);
   }
}
