import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('api/afisha/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createOrder(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto);
  }
}
