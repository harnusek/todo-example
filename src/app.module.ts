import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { ItemsController } from './items/items.controller';
import { ListsController } from './lists/lists.controller';

import { TypeOrmModule } from './datasources/datasources.module';

import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [TypeOrmModule, AuthModule, ItemsModule, UsersModule, ListsModule],
  controllers: [
    AppController,
    AuthController,
    ListsController,
    ItemsController,
  ],
  providers: [],
})
export class AppModule {}
