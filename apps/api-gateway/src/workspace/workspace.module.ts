import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { ApiGatewayService } from '../api-gateway.service';
import { TeamController } from './team.controller';

@Module({
   controllers: [WorkspaceController, TeamController],
   providers: [ApiGatewayService],
})
export class WorkspaceModule {}
