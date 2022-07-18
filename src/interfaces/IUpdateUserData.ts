import { EInvalidProperty } from '@enums/EInvalidProperty';
import { IsEmpty, IsOptional } from 'class-validator';

export class UpdateUserData {
  @IsEmpty({ message: `${EInvalidProperty.ERROR_MESSAGE} - userId` })
  readonly userId: string;

  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly phoneNumber: string;

  @IsOptional()
  readonly hashToken: string;

  @IsEmpty({ message: `${EInvalidProperty.ERROR_MESSAGE} - updatedAt` })
  public updatedAt: Date;
}
