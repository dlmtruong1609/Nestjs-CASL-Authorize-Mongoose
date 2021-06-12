import { AppAbility } from 'src/casl/casl-ability.factory';
import { Article } from 'src/entities/article.entity';
import { Action } from 'src/policies/enums/action.enum';
import { IPolicyHandler } from 'src/interfaces/ipolicy-handler.interface';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
