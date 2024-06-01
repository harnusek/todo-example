import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OnlyLoggedGuard implements CanActivate {
  constructor(protected jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(`call ${request.url}`);

    const [, token] = request.headers.authorization?.split(' ') ?? [];
    if (!token) {
      throw new UnauthorizedException('You have to be logged in');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Your token is invalid');
    }
    return true;
  }
}
