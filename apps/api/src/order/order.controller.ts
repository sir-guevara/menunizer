import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Req() request: any, @Query('placeId') placeId: string) {
    const user = request.user;
    const place = request.place;
    return { user, place, placeId };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
