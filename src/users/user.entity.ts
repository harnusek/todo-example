import { Item } from 'src/items/item.entity';
import { List } from 'src/lists/list.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20, nullable: false })
  login: string;

  @Column({ length: 60, nullable: false })
  @Exclude()
  password: string;

  @ManyToMany(() => List, (list) => list.sharedWith, { cascade: true })
  @JoinTable()
  lists: List[];

  @OneToMany(() => Item, (item) => item.createdBy)
  createdItems: Item[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
