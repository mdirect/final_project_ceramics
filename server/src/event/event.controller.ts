import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() event: EventDto) {
    return await this.eventService.create(event);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() event: EventDto) {
    return await this.eventService.update(+id, event);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventService.remove(+id);
  }
}
