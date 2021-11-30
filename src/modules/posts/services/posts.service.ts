import { Injectable } from '@nestjs/common'
import { PostsRepo } from '@datalayer/pg/posts/posts.repo'
import { IFindOptions } from '@datalayer/common/repo-common.interface'
import { IUser } from '@datalayer/pg/users/user.interface'
import { IPost, IPostsFilter } from '@datalayer/pg/posts/post.interface'
import { AppError } from '@lib/app-error/app-error'
import { ACCESS } from '@lib/app-error/error-codes'

@Injectable()
export class PostsService {
  constructor (
    private postsRepo: PostsRepo
  ) {}

  getPostsByUserId (userId: IUser['id'], options: IFindOptions<IPostsFilter>) {
    return this.postsRepo.getPostsByUserId(userId, options)
  }

  createPost (post: IPost) {
    return this.postsRepo.createPost(post)
  }

  async updatePost (post: IPost) {
    const { userId: ownerId } = await this.postsRepo.getPostById(post.id)
    if (ownerId !== post.userId) {
      throw new AppError({ ...ACCESS })
    }

    return this.postsRepo.updatePost(post)
  }
}