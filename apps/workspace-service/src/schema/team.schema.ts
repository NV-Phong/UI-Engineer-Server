import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
   @Prop()
   teamName: string;

   @Prop()
   teamSize: number;

   @Prop()
   teamDescription: string;

   @Prop()
   isDeleted: boolean;

   @Prop([
      {
         IDUser: { type: String, ref: 'User' },
         leader: Boolean,
         joinedAt: Date,
      },
   ])
   members: { IDUser: string; leader: boolean; joinedAt: Date }[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
