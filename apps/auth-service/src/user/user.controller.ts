import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get()
   getProfile(@Req() req) {
      console.log('User Info:', req.user);
      const USER = this.userService.FindByUserName(req.user.username);
      return USER;
   }
}
