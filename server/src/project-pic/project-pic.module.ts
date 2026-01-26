import { Module } from '@nestjs/common';
import { ProjectPicService } from './project-pic.service';
import { ProjectPicController } from './project-pic.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ProjectPicController],
  providers: [ProjectPicService],
  exports: [ProjectPicService],
})
export class ProjectPicModule {}
