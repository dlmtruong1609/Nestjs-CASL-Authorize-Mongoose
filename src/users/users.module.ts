import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from 'src/users/users.controler';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => CaslModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
