import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
@Controller()
// @UseGuards(AuthGuard('jwt'))
export class ApiGatewayController {
   constructor(private readonly authservice: ApiGatewayService) {}

   @Get()
   getHelloAPIGateway() {
      return 'API-Gateway';
   }

   @Get('auth-service')
   getHelloAuthService() {
      return this.authservice.send('GET-hello-auth', {});
   }
   
   @Get('workspace-service')
   getHelloWorkSpaceService() {
      return this.authservice.send('GET-hello-workspace', {});
   }

}
