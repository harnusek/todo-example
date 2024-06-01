import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateListDto {
  @ApiProperty({
    default: 'My first list',
    required: true,
    description: 'List name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;
}
