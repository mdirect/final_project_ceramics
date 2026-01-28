import { Filter } from '@prisma/client';

export class TagEntity {
  id: number;
  filter: Filter;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}
