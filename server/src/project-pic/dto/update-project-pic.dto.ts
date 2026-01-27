import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectPicDto } from './create-project-pic.dto';

export class UpdateProjectPicDto extends PartialType(CreateProjectPicDto) {}
