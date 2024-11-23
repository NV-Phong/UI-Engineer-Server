import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './configuration/jwt-auth.guard';

@Controller()
// @UseGuards(JwtAuthGuard)
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
