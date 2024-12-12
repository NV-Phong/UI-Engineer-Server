import { Controller, Get } from '@nestjs/common';
import { WorkspaceServiceService } from './workspace-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class WorkspaceServiceController {
  constructor(private readonly workspaceServiceService: WorkspaceServiceService) {}

  @MessagePattern('GET-hello-workspace')
  getHello(): string {
     return this.workspaceServiceService.getHello();
  }
}
