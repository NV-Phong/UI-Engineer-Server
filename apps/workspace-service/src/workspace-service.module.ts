import { Module } from '@nestjs/common';
import { WorkspaceServiceController } from './workspace-service.controller';
import { WorkspaceServiceService } from './workspace-service.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModule } from './team/team.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: [
            'apps/workspace-service/.env.development',
            'apps/workspace-service/.env',
         ],
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DATABASE),
      TeamModule,
   ],
   controllers: [WorkspaceServiceController],
   providers: [WorkspaceServiceService],
})
export class WorkspaceServiceModule {}
