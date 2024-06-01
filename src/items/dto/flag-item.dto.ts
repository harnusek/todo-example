import { ApiProperty } from '@nestjs/swagger';
import { ItemFlags } from '../item-flags.enum';
import { IsEnum } from 'class-validator';

export class FlagItemDto {
  @ApiProperty({
    enum: ItemFlags,
    default: 'done',
    required: false,
    description: 'Item status',
  })
  @IsEnum(ItemFlags)
  flag: string;
}
