import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    return await this.workerService.create(createWorkerDto);
  }

  @Get()
  async findAll() {
    return await this.workerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    return await this.workerService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return await this.workerService.remove(+id);
  }
}
