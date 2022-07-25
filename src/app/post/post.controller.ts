import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from '../../common/request';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';

@ApiBearerAuth()
@ApiTags('Post')
@Controller()
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Create a new post',
  })
  public async create(
    @Body() params: PostCreateDto,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const post = await this.postService.create(params, req.user);
      return post;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get post by id' })
  public async get(@Param('id') id: number) {
    return this.postService.find(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Update existing post by new values',
  })
  public async update(
    @Body() params: PostUpdateDto,
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const post = await this.postService.update(id, params, req.user);
      return post;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Delete existing post',
  })
  public async delete(@Param('id') id: number, @Req() req: Request) {
    try {
      await this.postService.delete(id, req.user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all posts created by user' })
  public async getUserPosts(@Req() req: Request) {
    return await this.postService.findUserPosts(req.user);
  }
}
