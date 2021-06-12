import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { CheckPolicies } from 'src/policies/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/policies/guards/policies.guard';
import { ReadArticlePolicyHandler } from 'src/policies/read.policy';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard, PoliciesGuard)
@Controller()
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @Roles(Role.Admin)
  @CheckPolicies(new ReadArticlePolicyHandler())
  getProfile(@Request() req) {
    return req.user;
  }
}
