import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from '../common/contants/constant';
import { JwtStragety } from './strategies/jwt.strategy';
import { Local1Stragety } from './strategies/local.strategy';

@Module({
  providers: [AuthService, Local1Stragety, JwtStragety],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
