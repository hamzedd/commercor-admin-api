import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { OrderEntity } from '@/src/libs/models/entities/order/Order.entity';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column()
  orderId: string;

  @Column()
  totalAmount: number;

  @Column()
  refundedAmount: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;
}
