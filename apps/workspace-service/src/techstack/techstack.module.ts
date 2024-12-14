import { Module } from '@nestjs/common';
import { TechstackService } from './techstack.service';
import { TechstackController } from './techstack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TechStack, TechStackSchema } from '../schema/techstack.schema';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: TechStack.name, schema: TechStackSchema },
      ]),
   ],
   providers: [TechstackService],
   controllers: [TechstackController],
})
export class TechstackModule {}
