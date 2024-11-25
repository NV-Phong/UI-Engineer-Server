import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
   @Prop({ required: true, unique: true })
   username: string;

   @Prop()
   password: string;

   @Prop({ unique: true })
   email: string;

   @Prop()
   displayname: string;

   @Prop({ unique: true })
   githubID: string;

   @Prop()
   GithubAccessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
