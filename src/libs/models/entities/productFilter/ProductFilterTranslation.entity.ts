import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductFilterEntity } from './ProductFilter.entity';

@Entity('product_filter_translations')
export class ProductFilterTranslationsEntity extends BaseEntity {
  @ManyToOne(() => ProductFilterEntity, (productFilter) => productFilter.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productFilterId' })
  productFilter: ProductFilterEntity;

  @Column()
  productFilterId: string;

  @Column()
  lang: string;

  @Column({
    unique: true,
  })
  name: string;
}
