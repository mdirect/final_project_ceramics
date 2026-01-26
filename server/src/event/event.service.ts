import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly dbService: DbService) {}

  async create(event: EventDto) {
    return await this.dbService.event.create({
      data: {
        ...event,
        date: new Date(event.date),
      },
    });
  }

  async findAll() {
    return await this.dbService.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.event.findUnique({
      where: { id },
    });
  }

  async update(id: number, event: EventDto) {
    return await this.dbService.event.update({
      where: { id },
      data: {
        ...event,
        date: event.date ? new Date(event.date) : undefined,
      },
    });
  }

  async remove(id: number) {
    return await this.dbService.event.delete({
      where: { id },
    });
  }
}
