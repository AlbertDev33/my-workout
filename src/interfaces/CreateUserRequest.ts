import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { EPhoneConfiguration } from 'enums/index';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(EPhoneConfiguration.COUNTRY_CODE, {
    message: EPhoneConfiguration.REQUIRED_ERROR_MESSAGE,
  })
  @Length(10, 11, { message: EPhoneConfiguration.LENGTH_ERROR_MESSAGE })
  phoneNumber: string;
}
