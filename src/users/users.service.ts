import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    return this.usersRepository
      .findOneOrFail({ where: { id }, relations: ['lists'] })
      .catch(() => {
        throw new Error(`User with id ${id} not found`);
      });
  }

  async findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOneBy({ login });
  }

  async findByLoginList(logins: string[]): Promise<User[]> {
    return this.usersRepository.find({ where: { login: In(logins) } });
  }

  async persist(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
