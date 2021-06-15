import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ArticleService } from 'src/article/article.service';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';
import { Article } from 'src/schemas/article.schema';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private articleService: ArticleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user, params } = context.switchToHttp().getRequest();
    const { id } = params;
    const ability = this.caslAbilityFactory.createForUser(user);

    const article = await this.articleService.findOne(id);
    const articleCheck = new Article();
    articleCheck.isPublished = article.isPublished;
    articleCheck.status = article.status;

    if (user) {
      articleCheck.author =
        article?.author?._id.toString() || article.author.toString();
    }
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, articleCheck),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    article: Article,
  ) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability, article);
  }
}
