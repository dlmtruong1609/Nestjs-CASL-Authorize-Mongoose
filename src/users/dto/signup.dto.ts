import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsUserAlreadyExist } from '../decorators/Is-user-already-exist.decorators';
import { Match } from '../decorators/mach.decorator';

export class SignUpDto {
  @IsEmail()
  @IsUserAlreadyExist()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  readonly password: string;

  @Match('password')
  readonly passwordConfirm: string;
}
