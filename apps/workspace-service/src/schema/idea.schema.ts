import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IdeaDocument = Idea & Document;

@Schema()
export class Idea {
   @Prop()
   ideaName: string;

   @Prop()
   ideaDescription: string;

   @Prop()
   ideaType: string;

   @Prop()
   ideaURL: string;

   @Prop()
   ideaImage: string;

   @Prop()
   isDeleted: boolean;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
