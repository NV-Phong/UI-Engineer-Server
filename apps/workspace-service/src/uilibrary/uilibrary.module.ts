import { Module } from '@nestjs/common';
import { UilibraryService } from './uilibrary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UILibrary, UILibrarySchema } from '../schema/uilibrary.schema';
import { UilibraryController } from './uilibrary.controller';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: UILibrary.name, schema: UILibrarySchema },
      ]),
   ],
   providers: [UilibraryService],
   controllers: [UilibraryController],
})
export class UilibraryModule {}
