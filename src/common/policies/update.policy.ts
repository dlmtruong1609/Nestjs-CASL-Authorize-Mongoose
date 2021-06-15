import { ArticleService } from 'src/articles/article.service';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/common/enums/action.enum';
import { IPolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';

export class UpdateArticlePolicyHandler implements IPolicyHandler {
  private aricleService: ArticleService;
  handle(ability: AppAbility, article) {
    return ability.can(Action.Update, article);
  }
}
