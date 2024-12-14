import { Module } from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { TeamController } from './team.controller';
import { UILibraryController } from './uilibrary.controller';

@Module({
   controllers: [TeamController, UILibraryController],
   providers: [ApiGatewayService],
})
export class WorkspaceModule {}
