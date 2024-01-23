import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OwnerCheckInterceptor } from 'src/middleware/owner.interceptor';

@UseGuards(JwtAuthGuard)
@UseInterceptors(OwnerCheckInterceptor)
@Controller('/orders/:placeId')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Param('placeId') placeId: string) {
    return this.orderService.findAll(placeId);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    // id = parseInt(id);
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(+id);
  }
}
