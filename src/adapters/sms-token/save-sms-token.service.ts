import { InjectDependencies } from '@constants/index';
import { EInvalidUser } from '@enums/EInvalidUser';
import { ISaveSmsTokenService } from '@interfaces/ISaveSmsTokenService';
import { IUserRepository } from '@interfaces/IUserRepository';

import { Inject, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SaveSmsTokenService implements ISaveSmsTokenService {
  constructor(
    @Inject(InjectDependencies.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async saveToken(email: string, smsToken: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(EInvalidUser.MESSAGE_ERROR);
    }

    await this.userRepository.updateUser({ userId: user.id, smsToken });
  }
}
