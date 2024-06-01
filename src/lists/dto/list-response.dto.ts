import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';
import { ItemResponseDto } from 'src/items/dto/item-response.dto';

export class ListResponseDto {
  @ApiProperty({
    example: '1',
    description: 'List id',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'List name',
    description: 'My first list',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: ItemResponseDto,
    isArray: true,
    type: ItemResponseDto,
    description: 'List of items',
  })
  @Expose()
  @Type(() => ItemResponseDto)
  @IsArray()
  items: ItemResponseDto[];

  @ApiProperty({
    example: UserResponseDto,
    isArray: true,
    type: UserResponseDto,
    description: 'User sharing list',
  })
  @Expose()
  @Type(() => UserResponseDto)
  @IsArray()
  sharedWith: UserResponseDto[];
}
