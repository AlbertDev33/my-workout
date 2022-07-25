import { InjectDependencies } from '@constants/index';
import { ISaveSmsTokenService } from '@interfaces/ISaveSmsTokenService';
import { IUserRepository } from '@interfaces/IUserRepository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SaveSmsTokenService implements ISaveSmsTokenService {
  constructor(
    @Inject(InjectDependencies.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async saveToken(userId: string, smsToken: string): Promise<void> {
    await this.userRepository.updateUser({ userId, smsToken });
  }
}
