import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), UsersModule],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
