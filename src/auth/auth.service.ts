import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserCredentialsDto): Promise<LoginResponseDto> {
    const { login, password: plainPassword } = userDto;

    const user = await this.usersService.findByLogin(userDto.login);
    if (!user) {
      throw new UnauthorizedException('User or password is incorrect');
    }

    const isPasswordCorrect = await compare(plainPassword, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('User or password is incorrect');
    }

    const payload = { userId: user.id, login };
    const access_token = await this.jwtService.signAsync(payload);
    return new LoginResponseDto(access_token);
  }

  async register(userDto: UserCredentialsDto): Promise<User> {
    const { login, password: plainPassword } = userDto;

    const existingUser = await this.usersService.findByLogin(userDto.login);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const password = await hash(plainPassword, 10);
    const user = new User({ login, password });

    return this.usersService.persist(user);
  }
}
