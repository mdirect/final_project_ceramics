import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly dbService: DbService) {}

  async create(post: PostDto) {
    return await this.dbService.post.create({
      data: post,
    });
  }

  async findAll() {
    return await this.dbService.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.post.findUnique({
      where: { id },
    });
  }

  async update(id: number, post: PostDto) {
    return await this.dbService.post.update({
      where: { id },
      data: post,
    });
  }

  async remove(id: number) {
    return await this.dbService.post.delete({
      where: { id },
    });
  }
}
