import { ICreateIdService } from '@interfaces/ICreateIdService';
import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateIdService implements ICreateIdService {
  public createId(): string {
    const generatedId = v4();
    return generatedId;
  }
}
