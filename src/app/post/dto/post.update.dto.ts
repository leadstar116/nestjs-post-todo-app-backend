import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the post',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public readonly title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the post',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public readonly description: string;
}
