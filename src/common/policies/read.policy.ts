import { AppAbility } from 'src/casl/casl-ability.factory';
import { Article } from 'src/entities/article.entity';
import { Action } from 'src/common/enums/action.enum';
import { IPolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
