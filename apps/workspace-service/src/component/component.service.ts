import { Injectable } from '@nestjs/common';
import { Component, ComponentDocument } from '../schema/component.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateComponentDTO } from './dto/create.dto';

@Injectable()
export class ComponentService {
   constructor(
      @InjectModel(Component.name)
      private componentModel: Model<ComponentDocument>,
   ) {}

   async CreateComponent(
      createcomponentDTO: CreateComponentDTO,
   ): Promise<Component> {
      const newComponent = new this.componentModel({
         ...createcomponentDTO,
         isDeleted: false,
      });
      return newComponent.save();
   }
}
