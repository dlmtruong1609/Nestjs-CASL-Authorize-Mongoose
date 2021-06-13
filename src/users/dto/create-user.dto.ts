import { IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from '../decorators/mach.decorator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @Match('password')
  readonly passwordConfirm: string;
}
