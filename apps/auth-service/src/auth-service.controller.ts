import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
   constructor(private readonly authServiceService: AuthServiceService) {}

   @MessagePattern('GET-hello')
   getHello(): string {
      return this.authServiceService.getHello();
   }

   @Get()
   getHellos(): string {
      return this.authServiceService.getHello();
   }
}
