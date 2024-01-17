import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(_createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: { ..._createCategoryDto },
    });
  }

  async findAll(id: string) {
    return await this.prisma.category.findMany({
      where: { placeId: id },
      include: {
        items: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findMany({
      where: { id: id },
      include: {
        items: true,
      },
    });
  }

  async update(id: string, _updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id: id },
      data: { ..._updateCategoryDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id: id } });
  }
}
