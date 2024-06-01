import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    description: 'JWT token',
  })
  @Expose()
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
