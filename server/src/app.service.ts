import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DbService } from './db/db.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async save(dto: CreateDTO): Promise<CreateDTO> {
    const res = await this.dbService.collection.create({
      data: dto,
    });

    return res;
  }
}
