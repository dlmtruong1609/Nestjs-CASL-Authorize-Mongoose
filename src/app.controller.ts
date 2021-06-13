import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createCatDto: CreateUserDto) {
    const user = await this.authService.register(createCatDto);
    const accessToken = await this.authService.login(user);
    user.password = null;
    return {
      ...accessToken,
      user,
    };
  }
}
