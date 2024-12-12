import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceController {
   constructor(private readonly workspaceservice: ApiGatewayService) {}

   @Get()
   getHelloWorkSpaceService() {
      return this.workspaceservice.send('GET-hello-workspace', {});
   }
}
