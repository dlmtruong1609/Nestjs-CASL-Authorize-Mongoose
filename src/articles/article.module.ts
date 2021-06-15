import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
