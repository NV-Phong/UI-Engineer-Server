import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UILibraryDocument = UILibrary & Document;

@Schema()
export class UILibrary {
   @Prop()
   uiLibraryName: string;

   @Prop()
   uiLibraryDescription: string;

   @Prop()
   version: string;

   @Prop()
   isDeleted: boolean;

   @Prop()
   style: string;

   @Prop({ ref: 'Team' })
   IDTeam: string;

   @Prop([{ type: String, ref: 'TechStack' }])
   techStacks: string[];
}

export const UILibrarySchema = SchemaFactory.createForClass(UILibrary);
