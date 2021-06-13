import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Article } from './article.schema';
import { Roles } from 'src/common/enums/roles.enum';
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ required: true, default: [Roles.Member] })
  roles: Array<string>;

  @Prop(
    raw({
      avatar: String,
      phone: String,
      address: {
        city: String,
        district: String,
        ward: String,
        street: String,
        number: String,
      },
    }),
  )
  profile: Record<string, any>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
  articles: Article[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  }
});
