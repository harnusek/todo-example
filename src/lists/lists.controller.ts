import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ListsService } from './lists.service';
import { ShareListDto } from './dto/share-list.dto';
import { OnlyLoggedGuard } from 'src/common/guards/only-logged.guard';
import { OnlyAuthorizedGuard } from 'src/common/guards/only-authorized.guard';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { ListResponseDto } from './dto/list-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('lists')
@ApiBearerAuth()
@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @ApiOperation({ summary: 'Create a new list' })
  @ApiCreatedResponse({
    type: ListResponseDto,
  })
  @UseGuards(OnlyLoggedGuard)
  @Post()
  async create(
    @LoggedUser('userId') userId: number,
    @Body() createListDto: CreateListDto,
  ): Promise<ListResponseDto> {
    const list = await this.listsService.create(userId, createListDto);
    return plainToInstance(ListResponseDto, list);
  }

  @ApiOperation({ summary: 'Find all lists for logged user' })
  @ApiOkResponse({
    type: ListResponseDto,
  })
  @UseGuards(OnlyLoggedGuard)
  @Get()
  async findByUser(
    @LoggedUser('userId') userId: number,
  ): Promise<ListResponseDto[]> {
    const lists = await this.listsService.findByUser(userId);
    return plainToInstance(ListResponseDto, lists);
  }

  @ApiOperation({ summary: 'Find list by ID' })
  @ApiParam({
    name: 'listId',
    type: Number,
    required: true,
    description: 'List ID',
  })
  @ApiOkResponse({
    type: ListResponseDto,
  })
  @Get(':listId')
  async findById(
    @Param('listId', ParseIntPipe) listId: number,
  ): Promise<ListResponseDto> {
    const list = await this.listsService.findById(listId);
    return plainToInstance(ListResponseDto, list);
  }

  @ApiOperation({ summary: 'Share list with other users' })
  @ApiParam({
    name: 'listId',
    type: Number,
    required: true,
    description: 'List ID',
  })
  @ApiOkResponse({
    type: ListResponseDto,
  })
  @UseGuards(OnlyAuthorizedGuard)
  @Put(':listId/share')
  async share(
    @Param('listId', ParseIntPipe) listId: number,
    @Body() shareListDto: ShareListDto,
  ): Promise<ListResponseDto> {
    const list = await this.listsService.share(listId, shareListDto);
    return plainToInstance(ListResponseDto, list);
  }
}
