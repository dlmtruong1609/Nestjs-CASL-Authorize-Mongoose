/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';
import { Article } from 'src/schemas/article.schema';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/common/enums/action.enum';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: PaginateModel<Article>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  private customLabels = {
    docs: 'nodes',
    page: 'currentPage',
    totalPages: 'pageCount',
    limit: 'perPage',
    totalDocs: 'itemCount',
  };

  async create(createArticleDto: CreateArticleDto, userId): Promise<Article> {
    createArticleDto.author = userId;
    const createdArticle = new this.articleModel(createArticleDto);

    return await createdArticle.save();
  }

  async update(
    id: string,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const article = await this.articleModel.findByIdAndUpdate(
      id,
      createArticleDto,
    );

    return await this.articleModel.findById(article._id);
  }

  async delete(id: string): Promise<Article> {
    return this.articleModel.findByIdAndDelete(id);
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id);
    return article;
  }

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<Article[]> {
    const options = {
      customLabels: this.customLabels,
      page,
      limit,
    };
    return this.articleModel.paginate(
      { isPublished: true, status: 1 },
      options,
    );
  }

  isAllowToRead(user: User, article: Article): Boolean {
    const ability = this.caslAbilityFactory.createForUser(user);
    const articleCheck = new Article();
    articleCheck.isPublished = article.isPublished;
    articleCheck.status = article.status;

    if (user) {
      articleCheck.author =
        article?.author?._id.toString() || article.author.toString();
    }
    if (!ability.can(Action.Read, articleCheck)) {
      return false;
    }

    return true;
  }
}
