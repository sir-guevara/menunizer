import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-menu.dto';
import { UpdtateOrderDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
  ) {}

  async create(createOrderDto) {
    return await this.prisma.order.create({
      data: { ...createOrderDto },
    });
  }

  async findMenu(placeId: string) {
    return await this.prisma.place.findUnique({
      where: { id: placeId },
      include: { categories: { include: { items: true } } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async update(id: number, updtateOrderDto: UpdtateOrderDto) {
    return await this.prisma.order.update({
      where: { id: id },
      data: { ...updtateOrderDto },
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({ where: { id: id } });
  }

  async createPaymentIntent(payment: CreateOrderDto) {
    try {
      const { paymentMethod, ...rest } = payment;
      const paymentIntent = await this.stripeClient.paymentIntents.create({
        amount: parseFloat((payment.amount * 100).toFixed(2)),
        currency: 'usd',
        payment_method: paymentMethod.id,
        off_session: true,
        confirm: true,
      });
      const order = await this.create({
        ...rest,
        paymentIntent: paymentIntent.id,
      });
      return order;
    } catch (error) {
      throw new Error(`Error creating Payment Intent: ${error.message}`);
    }
  }
}
