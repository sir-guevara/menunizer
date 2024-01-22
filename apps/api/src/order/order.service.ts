import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  findAll(placeId: string) {
    // console.log(placeId);
    return this.prisma.order.findMany({ where: { placeId } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: parseInt(`${id}`) },
      data: { ...updateOrderDto },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
