export const DATABASE_TYPE = 'postgres';

export enum InjectDependencies {
  SendMailService = 'ISendMailService',
  CreateUserService = 'ICreateUserService',
  UserRepository = 'IUserRepository',
  AuthService = 'IAuthService',
  MakeSmsTokenService = 'IMakeSmsTokenService',
  SaveSmsTokenService = 'ISaveSmsTokenService',
  SendSmsTokenService = 'ISendSmsTokenService',
  CreateIdService = 'ICreateIdService',
  WorkoutRepository = 'IWorkoutRepository',
}

export enum ErrorMessage {
  USER_ALREADY_EXIST = 'User already registered.',
}
