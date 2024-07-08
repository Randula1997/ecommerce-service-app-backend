/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<Orders>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save(); 
  }

  async findAll(): Promise<Orders[]> {
    return this.orderModel.find().exec();
  }
}
