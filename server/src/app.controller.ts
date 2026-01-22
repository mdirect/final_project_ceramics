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
import { CreateDTO } from './dto/create.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello() {
    return this.appService.getHello();
  }

  @Get('get/:id')
  getId(@Param('id', ParseIntPipe) id: number) {
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
  async post(@Body() dto: CreateDTO) {
    console.log(dto.image + ' - ' + dto.title + ': ' + dto.description);
    const res = await this.appService.save(dto);

    return res;
  }
}
