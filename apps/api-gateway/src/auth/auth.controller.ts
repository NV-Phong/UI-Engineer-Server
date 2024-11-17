import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { ApiGatewayService } from '../api-gateway.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authservice: ApiGatewayService) {}

   @Post('register')
   Register(@Body() registerDTO: RegisterDTO) {
      return this.authservice.send('POST-user', registerDTO);
   }
}
