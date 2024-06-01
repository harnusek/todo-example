import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  name: string;

  @OneToMany(() => Item, (item) => item.list)
  items: Item[];

  @ManyToMany(() => User, (user) => user.lists)
  sharedWith: User[];

  constructor(partial: Partial<List>) {
    Object.assign(this, partial);
  }
}
