import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async find(id: number): Promise<Post> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new Error('Post is not found!');
    }

    return post;
  }

  async findUserPosts(user: User): Promise<Post[]> {
    return this.postRepository.find({ userId: user.id });
  }

  create(params: PostCreateDto, user: User): Promise<Post> {
    const post = new Post({ ...params, userId: user.id });

    return this.postRepository.save(post);
  }

  async update(id: number, params: PostUpdateDto, user: User): Promise<Post> {
    const post = await this.find(id);

    if (user.id !== post.userId) {
      throw new Error('You are not allowed to update this post!');
    }

    Object.assign(post, params);

    return this.postRepository.save(post);
  }

  async delete(id: number, user: User): Promise<void> {
    const post = await this.find(id);

    if (user.id !== post.userId) {
      throw new Error('You are not allowed to delete this post!');
    }

    await this.postRepository.delete(id);
  }
}
