import { Module } from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { TeamController } from './team.controller';
import { UILibraryController } from './uilibrary.controller';
import { IdeaController } from './idea.controller';
import { ComponentController } from './component.controller';

@Module({
   controllers: [
      TeamController,
      UILibraryController,
      IdeaController,
      ComponentController,
   ],
   providers: [ApiGatewayService],
})
export class WorkspaceModule {}
