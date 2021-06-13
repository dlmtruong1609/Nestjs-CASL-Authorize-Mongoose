import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/enums/action.enum';
import { Roles } from 'src/common/enums/roles.enum';
import { Status } from 'src/common/enums/status.enum';
import { Article } from 'src/schemas/article.schema';
import { User } from 'src/schemas/user.schema';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.includes(Roles.Admin)) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, Article, { isPublished: true, status: Status.Approved });
      can(Action.Read, User);
    }

    can(Action.Update, Article, { author: user });
    cannot(Action.Delete, Article, { author: user });

    can(Action.Update, User, { email: user.email });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
