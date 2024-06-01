import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ListsService } from 'src/lists/lists.service';
import { UsersService } from 'src/users/users.service';
import { OnlyLoggedGuard } from './only-logged.guard';

@Injectable()
export class OnlyAuthorizedGuard extends OnlyLoggedGuard {
  constructor(
    protected jwtService: JwtService,
    protected usersService: UsersService,
    protected listsService: ListsService,
  ) {
    super(jwtService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const { listId } = request.params;
    const list = await this.listsService.findById(listId);

    const { userId } = request.user;
    const user = await this.usersService.findById(userId);

    if (user.lists.map((l) => l.id).includes(list.id)) {
      return true;
    }
    console.log(`Unauthorized access to list ${list.id} by user ${user.login}`);
    throw new UnauthorizedException('User is not authorized for this action');
  }
}
