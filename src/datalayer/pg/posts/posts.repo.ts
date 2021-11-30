import { EntityRepository, Repository } from 'typeorm'

import { IPost, IPostsFilter } from './post.interface'
import { IUser } from '../users/user.interface'
import { CatchDBError } from '@datalayer/decorators/catch-db-error.decorator'
import { PostEntity } from '@datalayer/pg/posts/post.entity'
import { IFindOptions, IPage } from '@datalayer/common/repo-common.interface'
import { defaultPagination } from '@datalayer/common/default-pagination'

@EntityRepository(PostEntity)
export class PostsRepo extends Repository<PostEntity> {
  @CatchDBError
  async getPostById (id: IPost['id']) {
    const data = await this.findOne({ id })
    if (data) return data || null
  }

  @CatchDBError
  async getPostsByUserId (userId: IUser['id'], options: IFindOptions<IPostsFilter>): Promise<IPage<PostEntity>> {
    const { pagination, filter } = options
    const [ items, total ] = await this.findAndCount({
      relations: [], // ['user']
      where: { userId, ...filter },
      skip: pagination?.offset || defaultPagination.offset,
      take: pagination?.limit || defaultPagination.limit
    })

    return { items, total }
  }

  @CatchDBError
  async createPost (post: PostEntity): Promise<PostEntity> {
    const { raw } = await this.insert(post)
    return raw[0]
  }

  @CatchDBError
  async updatePost (post: PostEntity): Promise<PostEntity> {
    await this.update(post.id, post)
    return post
  }
}

