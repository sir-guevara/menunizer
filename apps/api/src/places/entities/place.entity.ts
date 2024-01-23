import { Category } from '@prisma/client';

export class Place {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  numberOfTables: number;
  categories: Category[];
}
