import { Test } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { Request } from '../../common/request';
import { createRequest } from 'node-mocks-http';
import { User } from '../user/user.entity';
import { factory } from '../user/user.factory';

require('dotenv').config();

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  const currentUser: User = factory.build('user');
  const mockPost = new Post({
    title: 'Test Post',
    description: 'Test Description',
    userId: currentUser.id,
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PostRepository],
    }).compile();

    postService = moduleRef.get<PostService>(PostService);
    postController = moduleRef.get<PostController>(PostController);
  });

  describe('[GET /:id] should return post', () => {
    it('should return post', async () => {
      const postServiceFindSpy = jest
        .spyOn(postService, 'find')
        .mockImplementation(id => Promise.resolve(mockPost));

      const req: Request = createRequest();
      req.user = currentUser;

      expect(await postController.get(mockPost.id)).toEqual(mockPost);

      expect(postServiceFindSpy).toBeCalledTimes(1);
    });
  });

  describe('[POST] should create a new post', () => {
    it('should create a new post', async () => {
      const postServiceCreateSpy = jest
        .spyOn(postService, 'create')
        .mockImplementation(() => Promise.resolve(mockPost));

      const req: Request = createRequest();
      req.user = currentUser;
      req.body = {
        title: 'Test Post',
        description: 'Test Description',
      };

      expect(await postController.create(req.body, req)).toEqual(mockPost);

      expect(postServiceCreateSpy).toBeCalledTimes(1);
    });
  });

  describe('[UPDATE /:id] should update existing post by new values', () => {
    it('should update a post', async () => {
      const postServiceUpdateSpy = jest
        .spyOn(postService, 'update')
        .mockImplementation(() => Promise.resolve(mockPost));

      const req: Request = createRequest();
      req.user = currentUser;
      req.body = {
        title: 'Test Post - updated',
        description: 'Test Description - updated',
      };

      expect(await postController.update(req.body, req, mockPost.id)).toEqual(
        mockPost,
      );
      expect(postServiceUpdateSpy).toBeCalledTimes(1);
    });
  });

  describe('[DELETE /:id] should delete a post', () => {
    it('should delete a post', async () => {
      const postServiceDeleteSpy = jest
        .spyOn(postService, 'delete')
        .mockImplementation(() => Promise.resolve());

      const req: Request = createRequest();
      req.user = currentUser;

      await postController.delete(mockPost.id, req);

      expect(postServiceDeleteSpy).toBeCalledTimes(1);
    });
  });
});
