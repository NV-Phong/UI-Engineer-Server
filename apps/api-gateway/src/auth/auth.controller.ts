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
import { map } from 'rxjs/operators';
import { AuthGuard } from '@nestjs/passport';
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
   @UseGuards(AuthGuard('github'))
   LoginGithub() {}

   @Get('github/callback')
   @UseGuards(AuthGuard('github'))
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
   @UseGuards(AuthGuard('jwt-refresh'))
   RefreshToken(@Req() req) {
      return this.authservice.send('POST-refresh-token', req.user);
   }
}
