import { Module } from '@nestjs/common';
import { ApiGatewayService } from '../api-gateway.service';
import { TechStackController } from './techstack.controller';

@Module({
   controllers: [TechStackController],
   providers: [ApiGatewayService],
})
export class SystemModule {}
