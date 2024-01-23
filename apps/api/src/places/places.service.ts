import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}
  create(_createPlaceDto: CreatePlaceDto) {
    return this.prisma.place.create({
      data: { ..._createPlaceDto },
    });
  }

  findAllByOwner(ownerId: string) {
    return this.prisma.place.findMany({ where: { ownerId: ownerId } });
  }

  findOne(id: string) {
    return this.prisma.place.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  update(id: string, _updatePlaceDto: UpdatePlaceDto) {
    return this.prisma.place.update({
      where: { id },
      data: _updatePlaceDto,
      include: {
        categories: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.place.delete({ where: { id } });
  }
}
