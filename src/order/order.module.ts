/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema, Orders } from './schemas/order.schema';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, NotificationService, JwtAuthGuard, RolesGuard],
})
export class OrderModule {}
