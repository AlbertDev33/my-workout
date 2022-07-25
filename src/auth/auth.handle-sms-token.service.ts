import { InjectDependencies } from '@constants/index';
import { IAuthHandleSmsTokenService } from '@interfaces/IAuthHandleSmsTokenService';
import { IMakeSmsTokenService } from '@interfaces/IMakeSmsTokenService';
import { ISaveSmsTokenService } from '@interfaces/ISaveSmsTokenService';
import { ISendSmsTokenService } from '@interfaces/ISendSmsTokenService';
import { IUserRepository } from '@interfaces/IUserRepository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthHandleSmsTokenService implements IAuthHandleSmsTokenService {
  constructor(
    @Inject(InjectDependencies.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(InjectDependencies.MakeSmsTokenService)
    private readonly makeSmsToken: IMakeSmsTokenService,
    @Inject(InjectDependencies.SaveSmsTokenService)
    private readonly saveSmsToken: ISaveSmsTokenService,
    @Inject(InjectDependencies.SendSmsTokenService)
    private readonly sendSmsToken: ISendSmsTokenService,
  ) {}

  public async handleSmsToken(
    email: string,
    phoneNumber: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
