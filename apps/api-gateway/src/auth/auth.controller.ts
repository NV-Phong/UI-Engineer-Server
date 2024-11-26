import {
   Body,
   Controller,
   Get,
   Post,
   Req,
   Res,
   UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterDTO } from './dto/register.dto';
import { ApiGatewayService } from '../api-gateway.service';
import { LoginDTO } from './dto/login.dto';
import { GithubAuthGuard } from 'apps/api-gateway/src/configuration/github-auth.guard';
import { map } from 'rxjs/operators';

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
   async LoginGithubCallBack(
      @Req() req,
      @Res({ passthrough: true }) res: Response,
   ) {
      return this.authservice.send('GET-login-github', req.user).pipe(
         map((tokens) => {
            res.cookie('access_token', tokens.access_token);
            res.cookie('refresh_token', tokens.refresh_token);
            res.redirect(process.env.GITHUB_LOGIN_CLIENT_REDIRECT);
            return {
               access_token: tokens.access_token,
               refresh_token: tokens.refresh_token,
            };
         }),
      );
   }

   @Post('refresh-token')
   RefreshToken(@Body() payload: { refresh_token: string }) {
      console.log('Received refresh token:', payload.refresh_token);
      return this.authservice.send('POST-refresh-token', payload.refresh_token);
   }
}
