import { AppAbility } from 'src/casl/casl-ability.factory';
import { Article } from 'src/schemas/article.schema';

export interface IPolicyHandler {
  handle(ability: AppAbility, article: Article): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
