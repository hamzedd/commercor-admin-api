import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderEntity } from '@/src/libs/models/entities/order/Order.entity';
import { OrderDto } from '@/src/libs/models/dtos/orders/Order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    return await this.orderRepository.findOneOrFail({
      where: { id },
    });
  }

  async updateOrder(
    id: string,
    data: OrderDto,
  ): Promise<{ message: string }> {
    await this.orderRepository.manager.transaction(async (manager) => {
      const orderRepo = manager.getRepository(OrderEntity);

      const order = await orderRepo.findOneOrFail({
        where: { id },
      });
        Object.assign(order, data);

      await orderRepo.save(order);
    });

    return { message: 'Order updated successfully' };
  }
}


