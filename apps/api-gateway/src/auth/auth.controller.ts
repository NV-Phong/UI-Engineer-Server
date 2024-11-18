import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { ApiGatewayService } from '../api-gateway.service';
import { LoginDTO } from './dto/login.dto';
import { Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
   constructor(private readonly authservice: ApiGatewayService) {}

   @Post('register')
   Register(@Body() registerDTO: RegisterDTO) {
      return this.authservice.send('POST-register', registerDTO);
   }

   @Post('login')
   Login(@Body() loginDTO: LoginDTO) {
      return this.authservice.send('POST-login', loginDTO);
   }

   @Post('refresh-token')
   RefreshToken(@Body() payload: { refresh_token: string }) {
      console.log('Received refresh token:', payload.refresh_token);
      return this.authservice.send('POST-refresh-token', payload.refresh_token);
   }
}
