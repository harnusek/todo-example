import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    example: '1',
    description: 'User id',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'nick',
    description: 'User login',
  })
  @Expose()
  login: string;
}
