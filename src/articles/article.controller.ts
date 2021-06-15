import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Post,
  Body,
  Param,
  NotFoundException,
  ForbiddenException,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/common/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { CreateArticlePolicyHandler } from 'src/common/policies/create.policy';
import { DeleteArticlePolicyHandler } from 'src/common/policies/delete.policy';
import { UpdateArticlePolicyHandler } from 'src/common/policies/update.policy';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get('articles')
  getArticles(@Query('limit') limit, @Query('page') page) {
    return this.articleService.findAll({ page, limit });
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(new CreateArticlePolicyHandler())
  @Post('articles')
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req,
  ) {
    const userId = req.user._id;
    return {
      messages: 'Create Success',
      data: await this.articleService.create(createArticleDto, userId),
    };
  }

  @Get('articles/:id')
  async getArticle(@Param('id') id) {
    const article = await this.articleService.findOne(id);

    const isAllowToRead = this.articleService.isAllowToRead(null, article);
    if (!isAllowToRead) {
      throw new ForbiddenException();
    }

    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/articles/:id')
  async getArticleByMe(@Param('id') id, @Request() req) {
    const article = await this.articleService.findOne(id);

    const user = req.user;
    const isAllowToRead = this.articleService.isAllowToRead(user, article);
    if (!isAllowToRead) {
      throw new ForbiddenException();
    }

    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(new UpdateArticlePolicyHandler())
  @Put('articles/:id')
  async updateArticle(
    @Body() updateArticleDto: CreateArticleDto,
    @Param('id') id,
  ) {
    return {
      message: 'Updated Success',
      data: await this.articleService.update(id, updateArticleDto),
    };
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(new DeleteArticlePolicyHandler())
  @Delete('articles/:id')
  async deleteArticle(@Param('id') id) {
    return {
      messages: 'Delete Success',
      data: await this.articleService.delete(id),
    };
  }
}
