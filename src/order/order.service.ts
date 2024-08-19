/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { Orders } from './schemas/order.schema';
import { NotificationService } from './notification.service';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<Orders>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    const createdOrder = new this.orderModel(createOrderDto);
    const order = await createdOrder.save();
    // const user = await this.userModel.findOne({ email: createOrderDto.email });
    console.log('order.email', order.email)
    if (order.email) { 
      await this.notificationService.sendEmail(
          order.email,
          'New Order Created',
          `A new order has been created with ID: ${order._id}`,
      );
  }

    // await this.notificationService.sendSMS(
    //   `+${order.contactNumber}`,
    //   `Your order has been placed successfully and is yet to be confirmed. Order ID: ${order._id}`,
    // );

    return order;
  }

  async findAll(): Promise<Orders[]> {
    return this.orderModel.find().exec();
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Orders> {
    const order = await this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true }).exec();

    if (status === OrderStatus.APPROVED) {
      await this.notificationService.sendEmail(
        order.email,
          'New Order has been Approved',
          `Your order has been Approved with ID: ${order._id} `,
      );
    }

    return order;
  }

  async assignOrderToServiceProvider(orderId: string, serviceProviderId: string): Promise<Orders> {
    // Check if the service provider is a registered user
    const serviceProvider = await this.userModel.findById(serviceProviderId);
    if (!serviceProvider) {
      throw new NotFoundException('Service provider not found');
    }

    // Update the order with the service provider's ID and change status to APPROVED
    const order = await this.orderModel.findByIdAndUpdate(
      orderId,
      { serviceProviderId, status: OrderStatus.APPROVED },
      { new: true },
    ).exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
  
}
