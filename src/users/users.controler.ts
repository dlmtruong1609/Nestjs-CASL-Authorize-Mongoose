import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { CheckPolicies } from 'src/common/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { ReadArticlePolicyHandler } from 'src/common/policies/read.policy';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

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
