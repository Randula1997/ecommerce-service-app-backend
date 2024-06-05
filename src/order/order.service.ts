/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetail } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('OrderDetail') private readonly orderModel: Model<OrderDetail>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDetail> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderModel.find().exec();
  }
}
