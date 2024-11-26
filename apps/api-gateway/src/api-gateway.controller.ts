import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from '@nestjs/passport';
@Controller()
@UseGuards(AuthGuard('jwt'))
export class ApiGatewayController {
   constructor(private readonly authservice: ApiGatewayService) {}

   @Get()
   getHello() {
      return this.authservice.send('GET-hello', {});
   }

}
