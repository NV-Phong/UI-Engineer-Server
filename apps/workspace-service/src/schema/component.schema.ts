import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ComponentDocument = Component & Document;

@Schema()
export class Component {
   @Prop()
   componentName: string;

   @Prop()
   componentDescription: string;

   @Prop()
   language: string;

   @Prop()
   code: string;

   @Prop()
   idea: string[];

   @Prop()
   IDUILibrary: string;

   @Prop()
   isDeleted: boolean;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
