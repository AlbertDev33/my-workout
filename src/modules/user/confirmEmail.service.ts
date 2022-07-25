import { InjectDependencies } from '@constants/index';
import { EInvalidToken } from '@enums/EInvalidUserToken';
import { IConfirmEmailService } from '@interfaces/IConfirmEmailService';
import { IUserRepository } from '@interfaces/IUserRepository';

import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmEmailService implements IConfirmEmailService {
  constructor(
    @Inject(InjectDependencies.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(userId: string, userToken: string): Promise<void> {
    const user = await this.userRepository.getUser(userId);

    if (user?.userToken !== userToken) {
      throw new ForbiddenException(EInvalidToken.MESSAGE_ERROR);
    }
    await this.userRepository.updateUser({ userId, confirmedEmail: true });
  }
}
