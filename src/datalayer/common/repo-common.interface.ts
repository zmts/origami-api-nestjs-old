export interface IBaseEntity {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IPagination {
  limit?: number
  offset?: number
}

export interface IPage <T> {
  items: Array<T>,
  total: number
}

export interface IFindOptions <T> {
  pagination?: IPagination,
  filter?: T
}