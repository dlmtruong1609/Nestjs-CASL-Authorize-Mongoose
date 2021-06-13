import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from 'src/users/users.controler';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
