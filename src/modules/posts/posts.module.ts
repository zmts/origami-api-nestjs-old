import { Module } from '@nestjs/common'
import { PostsController } from '@root/modules/posts/posts.controller'
import { PostsService } from '@root/modules/posts/services/posts.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsRepo } from '@datalayer/pg/posts/posts.repo'

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([PostsRepo])
  ],
})
export class PostsModule {}
