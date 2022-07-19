import { ErrorMessage, InjectDependencies } from '@constants/index';
import { Tokens } from '@customTypes/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { IAuthService } from '@interfaces/IAuthService';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { ISendMailService } from '@interfaces/ISendMail';
import { IUserRepository } from '@interfaces/IUserRepository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(InjectDependencies.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(InjectDependencies.SendMailService)
    private readonly sendMailService: ISendMailService,
    @Inject(InjectDependencies.AuthService)
    private readonly authService: IAuthService,
  ) {}

  public async execute(user: CreateUserRequest): Promise<Tokens> {
    const isRegisteredUser = await this.userRepository.findByEmail(user.email);

    if (isRegisteredUser) {
      throw new Error(ErrorMessage.USER_ALREADY_EXIST);
    }

    const createdUser = await this.userRepository.create(user);
    const { accessToken, refreshToken } = await this.authService.getTokens(
      createdUser.id,
      createdUser.email,
    );
    await this.authService.updateHashRefreshToken(refreshToken);

    // await this.sendMailService.execute({
    //   from: process.env.MAIL_FROM,
    //   to: createdUser.email,
    //   subject: process.env.USER_CREATE_MAIL_SUBJECT,
    //   template: process.env.USER_CREATE_MAIL_TEMPLATE,
    //   'h:X-Mailgun-Variables': {
    //     name: createdUser.name,
    //     link: createdUser.userToken,
    //   },
    // });
    return {
      accessToken,
      refreshToken,
    };
  }
}
