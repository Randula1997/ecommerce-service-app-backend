/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Patch, Param, UseGuards, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
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
  @ApiBearerAuth()
  async findAll(): Promise<Orders[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/status')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(OrderStatus),
          example: OrderStatus.APPROVED,
        },
      },
    },
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Orders> {
    return this.orderService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':orderId/assign/:serviceProviderId')
  @Roles('admin')
  @ApiBearerAuth()
  async assignOrderToServiceProvider(
    @Param('orderId') orderId: string,
    @Param('serviceProviderId') serviceProviderId: string,
  ): Promise<Orders> {
    return this.orderService.assignOrderToServiceProvider(orderId, serviceProviderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  @ApiBearerAuth()
  async getOrdersByUser(@Param('userId') userId: string): Promise<Orders[]> {
    return this.orderService.findOrdersByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('service-provider/:serviceProviderId')
  @ApiBearerAuth()
  async getOrdersByServiceProvider(@Param('serviceProviderId') serviceProviderId: string): Promise<Orders[]> {
    return this.orderService.findOrdersByServiceProvider(serviceProviderId);
  }
}
