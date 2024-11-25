import {
   Body,
   Controller,
   Get,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { ApiGatewayService } from '../api-gateway.service';
import { LoginDTO } from './dto/login.dto';
import { GithubAuthGuard } from 'apps/api-gateway/src/configuration/github-auth.guard';

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

   @Get('github')
   @UseGuards(GithubAuthGuard)
   LoginGithub() {}

   @Get('github/callback')
   @UseGuards(GithubAuthGuard)
   LoginGithubCallBack(@Req() req) {
      return this.authservice.send('POST-login-github', req.user);
   }

   @Post('refresh-token')
   RefreshToken(@Body() payload: { refresh_token: string }) {
      console.log('Received refresh token:', payload.refresh_token);
      return this.authservice.send('POST-refresh-token', payload.refresh_token);
   }
}
