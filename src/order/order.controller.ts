/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Patch, Param, UseGuards, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Orders> {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('admin')
  async findAll(): Promise<Orders[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/status')
  @Roles('admin')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Orders> {
    return this.orderService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':orderId/assign/:serviceProviderId')
  @Roles('admin')
  async assignOrderToServiceProvider(
    @Param('orderId') orderId: string,
    @Param('serviceProviderId') serviceProviderId: string,
  ): Promise<Orders> {
    return this.orderService.assignOrderToServiceProvider(orderId, serviceProviderId);
  }
}
