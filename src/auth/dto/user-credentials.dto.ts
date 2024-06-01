import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserCredentialsDto {
  @ApiProperty({ default: 'nick', required: true, description: 'User login' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  login: string;

  @ApiProperty({
    default: 'nbusr123',
    required: true,
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
