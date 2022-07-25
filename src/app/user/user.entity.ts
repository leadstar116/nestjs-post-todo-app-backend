import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { Post } from '../post/post.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  passwordHash: string;

  @OneToMany(
    type => User,
    user => user.posts,
  )
  posts: Post[];
}
