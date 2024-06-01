import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class ShareListDto {
  @ApiProperty({
    default: ['nick', 'john'],
    required: true,
    isArray: true,
    description: 'User logins to share the list with',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  logins: string[];
}
