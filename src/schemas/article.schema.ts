import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Status } from 'src/common/enums/status.enum';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: any;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: Status.Pending })
  status: number;

  @Prop({ required: true })
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.plugin(mongoosePaginate);
