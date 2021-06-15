import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Status } from 'src/common/enums/status.enum';
import {
  accessibleRecordsPlugin,
  accessibleFieldsPlugin,
  AccessibleModel,
  AccessibleFieldsDocument,
} from '@casl/mongoose';

export interface Article extends AccessibleFieldsDocument {
  title: string;

  description: string;

  author: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };

  isPublished: boolean;

  status: number;

  content: string;
}

export const ArticleSchema = new mongoose.Schema<Article>(
  {
    title: { type: String, required: true },

    description: {
      type: String,
    },

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    isPublished: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Number,
      default: Status.Pending,
    },

    content: { type: String },
  },
  { timestamps: true, collection: 'articles' },
);

ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.plugin(accessibleFieldsPlugin);
ArticleSchema.plugin(accessibleRecordsPlugin);

export const Article = mongoose.model<Article, AccessibleModel<Article>>(
  'Article',
  ArticleSchema,
);
