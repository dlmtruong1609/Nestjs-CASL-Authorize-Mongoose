import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/users/dto/signup.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    const isMatch = await bcrypt.compare(pass, user?.password || '');

    if (user && isMatch) {
      return user;
    }
    return null;
  }

  async login(user: User | any) {
    const payload = { email: user.email, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }
}
