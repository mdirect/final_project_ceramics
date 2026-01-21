import { IsNumber, Min } from 'class-validator';
export class CreateDTO {
  @Min(1)
  @IsNumber()
  num: number;
  name: string;
  desc: string;
}
