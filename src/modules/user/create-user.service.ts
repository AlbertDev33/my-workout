import { ErrorMessage, InjectTokens } from '@constants/index';
import { Tokens } from '@customTypes/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { ISendMailService } from '@interfaces/ISendMail';
import { IUserRepository } from '@interfaces/IUserRepository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(InjectTokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(InjectTokens.SendMailService)
    private readonly sendMailService: ISendMailService,
  ) {}

  public async execute(user: CreateUserRequest): Promise<Tokens> {
    const isRegisteredUser = await this.userRepository.findByEmail(user.email);

    if (isRegisteredUser) {
      throw new Error(ErrorMessage.USER_ALREADY_EXIST);
    }

    const createdUser = await this.userRepository.create(user);

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
      accessToken: '',
      refreshToken: '',
    };
  }
}
