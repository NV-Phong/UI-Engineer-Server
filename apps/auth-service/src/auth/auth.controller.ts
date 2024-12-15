import { Controller, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AuthController {
   constructor(private readonly authservice: AuthService) {}

   @MessagePattern('POST-register')
   async RegisterAccount(@Payload() registerDTO: RegisterDTO) {
      return await this.authservice.Register(registerDTO);
   }

   @MessagePattern('POST-login')
   async LoginAccount(@Payload() loginDTO: LoginDTO) {
      return await this.authservice.Login(loginDTO);
   }

   @MessagePattern('POST-refresh-token')
   async RefreshToken(@Payload() refreshaccesstokenDTO: RefreshAccessTokenDTO) {
      return await this.authservice.RefreshAccessToken(refreshaccesstokenDTO);
   }

   @MessagePattern('GET-login-github')
   async GithubLogin(@Payload() githubToken: TokenResponse) {
      return this.authservice.GithubLoginOrCreate(githubToken);
   }
}
