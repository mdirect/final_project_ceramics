import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDTO } from 'src/dto/create.dto';
 g service db
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get/:id')
  getId(@Param('id', ParseIntPipe) id: number): number {
    if (id < 1) {
      throw new BadRequestException('Id must be a positive integer');
    }
    return id;
  }

  @Post('create')
  create(): void {
    console.log('post');
  }

  @UsePipes(new ValidationPipe())
  @Post('post')
  post(@Body() dto: CreateDTO): CreateDTO {
    console.log(dto.num + '. ' + dto.name + ': ' + dto.desc);
    return dto;
  }
}
