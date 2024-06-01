import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { ShareListDto } from './dto/share-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createListDto: CreateListDto): Promise<List> {
    const list = new List(createListDto);
    const createdBy = await this.usersService.findById(userId);
    list.sharedWith = [createdBy];
    return this.listsRepository.save(list);
  }

  async findByUser(userId: number): Promise<List[]> {
    const lists = await this.listsRepository.find({
      where: { sharedWith: { id: userId } },
      relations: ['items', 'sharedWith'],
    });
    return lists || [];
  }

  findById(id: number): Promise<List> {
    const list = this.listsRepository
      .findOneOrFail({
        where: { id },
        relations: ['items', 'sharedWith', 'items.createdBy'],
      })
      .catch(() => {
        throw new NotFoundException(`List with id ${id} not found`);
      });

    return list;
  }

  async share(id: number, shareListDto: ShareListDto): Promise<List> {
    const list = await this.findById(id);
    const foundUsers = await this.usersService.findByLoginList(
      shareListDto.logins,
    );

    // raise error if some users found
    if (foundUsers.length !== shareListDto.logins.length) {
      const foundLogins = foundUsers.map((user) => user.login);
      const notFoundLogins = shareListDto.logins.filter(
        (login) => !foundLogins.includes(login),
      );
      throw new NotFoundException(`Users not found: [${notFoundLogins}]`);
    }

    // add only users that are not already in sharedWith list
    list.sharedWith = [
      ...list.sharedWith,
      ...foundUsers.filter(
        (user) => !list.sharedWith.map((u) => u.id).includes(user.id),
      ),
    ];

    return await this.listsRepository.save(list);
  }
}
