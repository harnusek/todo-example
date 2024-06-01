import { List } from 'src/lists/list.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ItemFlags } from './item-flags.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => List, (list) => list.items)
  list: List;

  @Column({ length: 20, nullable: false })
  title: string;

  @Column({ default: '', nullable: false })
  text: string;

  @Column({ type: 'timestamptz' })
  deadline: Date | null;

  @ManyToOne(() => User, (user) => user.createdItems, { nullable: false })
  createdBy: User;

  @Column({
    type: 'enum',
    enum: ItemFlags,
    default: 'active',
  })
  flag: string;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
