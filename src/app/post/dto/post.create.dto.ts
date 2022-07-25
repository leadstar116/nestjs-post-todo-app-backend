import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../post/post.entity';

export class PostCreateDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the post',
  })
  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the post',
  })
  @IsNotEmpty()
  @IsString()
  public readonly description: string;

  public toPost(): Post {
    const { ...params } = this;

    return Object.assign(new Post(), params);
  }
}
