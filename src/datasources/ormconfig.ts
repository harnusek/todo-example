import { DataSource } from 'typeorm';
import { Item } from '../items/item.entity';
import { List } from '../lists/list.entity';
import { User } from '../users/user.entity';

export const LocalDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tester',
  password: 'S3cr3t',
  database: 'todo-example',
  entities: [Item, List, User],
  migrations: ['migrations/*.{ts,js}'],
});
