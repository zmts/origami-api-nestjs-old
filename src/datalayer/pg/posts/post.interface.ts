import { IBaseEntity } from '@datalayer/common/repo-common.interface'

export interface IPost extends IBaseEntity {
  title?: string
  content?: string
  isFeatured?: boolean
  isDraft?: boolean
  userId?: number
}

export interface IPostsFilter {
  isFeatured?: boolean
  isDraft?: boolean
}