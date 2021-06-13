import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
