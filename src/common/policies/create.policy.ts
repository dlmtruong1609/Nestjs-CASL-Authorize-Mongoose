import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/common/enums/action.enum';
import { IPolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';
import { User } from 'src/schemas/user.schema';

export class CreateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, User);
  }
}
