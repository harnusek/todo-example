import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { AddItemDto } from './dto/add-item.dto';
import { OnlyAuthorizedGuard } from 'src/common/guards/only-authorized.guard';
import { FlagItemDto } from './dto/flag-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('lists-items')
@ApiBearerAuth()
@Controller('lists/:listId/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Add item to list' })
  @ApiParam({
    name: 'listId',
    type: Number,
    required: true,
    description: 'List ID',
  })
  @ApiCreatedResponse({
    type: ItemResponseDto,
  })
  @UseGuards(OnlyAuthorizedGuard)
  @Post('')
  async addItem(
    @Param('listId', ParseIntPipe) listId: number,
    @LoggedUser('userId') userId: number,
    @Body() addItemDto: AddItemDto,
  ): Promise<ItemResponseDto> {
    const item = await this.itemsService.addItem(listId, userId, addItemDto);
    return plainToInstance(ItemResponseDto, item);
  }

  @ApiOperation({ summary: 'Change item flag' })
  @ApiParam({
    name: 'listId',
    type: Number,
    required: true,
    description: 'List ID',
  })
  @ApiParam({
    name: 'itemId',
    type: Number,
    required: true,
    description: 'Item ID',
  })
  @ApiOkResponse({
    type: ItemResponseDto,
  })
  @UseGuards(OnlyAuthorizedGuard)
  @Put(':itemId/flag')
  async update(
    @Param('listId', ParseIntPipe) listId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() flagItemDto: FlagItemDto,
  ): Promise<ItemResponseDto> {
    const item = await this.itemsService.flagItem(listId, itemId, flagItemDto);
    return plainToInstance(ItemResponseDto, item);
  }
}
