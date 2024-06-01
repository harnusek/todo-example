import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  async register(
    @Body() userDto: UserCredentialsDto,
  ): Promise<UserResponseDto> {
    const user = await this.authService.register(userDto);
    return plainToInstance(UserResponseDto, user);
  }

  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  login(@Body() userDto: UserCredentialsDto): Promise<LoginResponseDto> {
    return this.authService.login(userDto);
  }
}
