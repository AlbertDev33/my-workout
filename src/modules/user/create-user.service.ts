import { ErrorMessage, InjectDependencies } from '@constants/index';
import { CreateUserShape } from '@customTypes/create_user_shape.type';
import { Tokens } from '@customTypes/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { IAuthService } from '@interfaces/IAuthService';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { ISendMailService } from '@interfaces/ISendMail';
import { IUserRepository } from '@interfaces/IUserRepository';
import { v4 as createUUID } from 'uuid';

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

    const id = createUUID();
    const { accessToken, refreshToken } = await this.authService.getTokens(
      id,
      user.email,
    );
    const hashToken = await this.authService.hashData(refreshToken);

    const createdUser: CreateUserShape = {
      id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      hashToken,
    };
    const { userToken } = await this.userRepository.create(createdUser);

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
