import { Injectable } from '@nestjs/common';
import {
   ClientProxy,
   ClientProxyFactory,
   Transport,
} from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
   private client: ClientProxy;

   constructor() {
      this.client = ClientProxyFactory.create({
         transport: Transport.REDIS,
         options: {
            host: process.env.HOST,
            port: Number(process.env.REDIS_PORT),
         },
      });
   }

   send(pattern: string, data: any) {
      return this.client.send(pattern, data);
   }
}
