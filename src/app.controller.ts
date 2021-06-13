import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { SignUpDto } from './users/dto/signup.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.register(signUpDto);
    const accessToken = await this.authService.login(user);
    user.password = null;
    return {
      ...accessToken,
      user,
    };
  }
}
