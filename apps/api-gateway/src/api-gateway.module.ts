import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { SystemModule } from './system/system.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: [
            'apps/api-gateway/.env.development',
            'apps/api-gateway/.env',
         ],
         isGlobal: true,
      }),
      AuthModule,
      WorkspaceModule,
      SystemModule,
   ],
   controllers: [ApiGatewayController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
