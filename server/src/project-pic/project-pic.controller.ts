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
import { ProjectPicService } from './project-pic.service';
import { CreateProjectPicDto } from './dto/create-project-pic.dto';
import { UpdateProjectPicDto } from './dto/update-project-pic.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('project-pic')
export class ProjectPicController {
  constructor(private readonly projectPicService: ProjectPicService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createProjectPicDto: CreateProjectPicDto) {
    return await this.projectPicService.create(createProjectPicDto);
  }

  @Get()
  async findAll() {
    return await this.projectPicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectPicService.findOne(+id);
  }

  @Get('project/:projectId')
  async findByProjectId(@Param('projectId') projectId: string) {
    return await this.projectPicService.findByProjectId(+projectId);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateProjectPicDto: UpdateProjectPicDto,
  ) {
    return await this.projectPicService.update(+id, updateProjectPicDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return await this.projectPicService.remove(+id);
  }
}
