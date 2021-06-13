import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckPolicies } from 'src/common/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { ReadArticlePolicyHandler } from 'src/common/policies/read.policy';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller()
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('users/profile')
  @CheckPolicies(new ReadArticlePolicyHandler())
  getProfile(@Request() req) {
    return req.user;
  }
}
