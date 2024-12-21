import { Module } from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { TeamController } from './team.controller';
import { UILibraryController } from './uilibrary.controller';
import { IdeaController } from './idea.controller';

@Module({
   controllers: [TeamController, UILibraryController, IdeaController],
   providers: [ApiGatewayService],
})
export class WorkspaceModule {}
