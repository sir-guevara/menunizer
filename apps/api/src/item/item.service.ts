import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return await this.prisma.menuItem.create({ data: { ...createItemDto } });
  }

  async findAll(id: string) {
    return await this.prisma.menuItem.findMany({ where: { categoryId: id } });
  }

  async findOne(id: string) {
    return await this.prisma.menuItem.findUnique({ where: { id } });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.prisma.menuItem.update({
      where: { id },
      data: { ...updateItemDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.menuItem.delete({ where: { id } });
  }
}
