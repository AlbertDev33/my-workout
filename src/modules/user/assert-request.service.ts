import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { IAssertRequestService } from '@interfaces/IAssertRequestService';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AssertRequestService implements IAssertRequestService {
  public async execute(body: CreateUserRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
