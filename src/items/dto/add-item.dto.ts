import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddItemDto {
  @ApiProperty({
    default: 'New item',
    required: true,
    description: 'Item title',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  title: string;

  @ApiProperty({
    default: 'Buy bitcoin',
    required: false,
    description: 'Item description',
  })
  @IsString()
  text: string;

  @ApiProperty({
    default: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    required: false,
    description: 'Item deadline',
  })
  @IsDateString()
  deadline: Date;
}
