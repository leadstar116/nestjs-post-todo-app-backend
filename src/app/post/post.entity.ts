import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { User } from '../user/user.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column({ unique: true })
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(
    type => Post,
    user => user.user,
  )
  @JoinColumn({ name: 'user_id' })
  user: User | null;
}
