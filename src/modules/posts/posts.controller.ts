import {
  Body,
  Controller,
  Get, Param, ParseIntPipe, Patch,
  Post, Query,
  UseGuards
} from '@nestjs/common'

import { ReqUser } from '@common/decorators/req-user.decorator'
import { AuthGuard } from '@common/guards/auth.guard'
import { ReqUserDto } from '@common/dto/req-user.dto'
import { PaginationDto } from '@common/dto/pagination.dto'

import { PostsService } from './services/posts.service'
import { PostCreateDto } from './dto/post-create.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { PostsFilterDto } from './dto/posts-filter.dto'
import { IPost } from '@datalayer/pg/posts/post.interface'

@Controller()
export class PostsController {
  constructor (
    private postService: PostsService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getUserPosts (
    @Query('pagination') pagination: PaginationDto,
    @Query('filter') filter: PostsFilterDto,
    @ReqUser() { userId }: ReqUserDto
  ) {
    return this.postService.getPostsByUserId(userId, { pagination, filter })
  }

  @UseGuards(AuthGuard)
  @Post()
  newPost (
    @Body() dto: PostCreateDto,
    @ReqUser() { userId }: ReqUserDto
  ) {
    return this.postService.createPost({ ...dto, userId })
  }

  @UseGuards(AuthGuard)
  @Patch('/:postsId')
  updatePost (
    @Param('postsId', ParseIntPipe) postsId: IPost['id'],
    @Body() dto: PostUpdateDto,
    @ReqUser() { userId }: ReqUserDto
  ) {
    return this.postService.updatePost({ ...dto, id: postsId, userId })
  }
}
