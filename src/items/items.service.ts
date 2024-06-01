import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { FlagItemDto } from './dto/flag-item.dto';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ListsService } from 'src/lists/lists.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private listsService: ListsService,
    private usersService: UsersService,
  ) {}

  async addItem(
    listId: number,
    userId: number,
    addItemDto: AddItemDto,
  ): Promise<Item> {
    const item = new Item(addItemDto);

    const createdBy = await this.usersService.findById(userId);
    item.createdBy = createdBy;

    const list = await this.listsService.findById(listId);
    item.list = list;
    return this.itemsRepository.save(item);
  }

  async flagItem(
    listId: number,
    itemId: number,
    flagItemDto: FlagItemDto,
  ): Promise<Item> {
    const item = await this.itemsRepository
      .findOneOrFail({
        where: { id: itemId },
        relations: ['list', 'createdBy'],
      })
      .catch(() => {
        throw new NotFoundException(`Item with id ${itemId} not found`);
      });

    if (item.list.id !== listId) {
      throw new NotFoundException(
        `Item with id ${itemId} is not in list with id ${listId}`,
      );
    }

    flagItemDto.flag && (item.flag = flagItemDto.flag);
    return this.itemsRepository.save(item);
  }
}
