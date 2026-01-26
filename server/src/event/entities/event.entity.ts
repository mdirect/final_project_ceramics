export class EventEntity {
  id: number;
  title: string;
  date: Date;
  place: string;
  desc: string | null;
  image: string | null;
  status: 'UPCOMING' | 'PAST';
  createdAt: Date;
  updatedAt: Date;
}
