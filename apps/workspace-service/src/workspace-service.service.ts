import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceServiceService {
  getHello(): string {
    return 'WorkSpace-Service';
  }
}
