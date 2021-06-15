import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/common/enums/action.enum';
import { IPolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';
import { Article } from 'src/schemas/article.schema';

export class DeleteArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, article: Article) {
    return ability.can(Action.Delete, article);
  }
}
