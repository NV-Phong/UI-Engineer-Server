import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TechStackDocument = TechStack & Document;

@Schema()
export class TechStack {
   @Prop({ unique: true })
   technology: string;

   @Prop()
   version: string;

   @Prop()
   techDescription: string;

   @Prop()
   isDeleted: boolean;
}

export const TechStackSchema = SchemaFactory.createForClass(TechStack);
