import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';
import { ItemFlags } from '../item-flags.enum';
import { IsEnum } from 'class-validator';

export class ItemResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Item id',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'New item',
    description: 'Item title',
  })
  @Expose()
  title: string;

  @ApiProperty({
    default: 'Buy bitcoin',
    description: 'Item description',
  })
  @Expose()
  text: string;

  @ApiProperty({
    default: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    description: 'Deadline',
  })
  @Expose()
  deadline: Date;

  @ApiProperty({
    example: UserResponseDto,
    description: 'User login',
  })
  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @ApiProperty({
    enum: ItemFlags,
    example: 'active',
    description: 'Item status',
  })
  @Expose()
  @IsEnum(ItemFlags)
  flag: string;
}
