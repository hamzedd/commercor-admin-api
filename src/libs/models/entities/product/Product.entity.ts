import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { ProductTranslationEntity } from '@/src/libs/models/entities/product/ProductTranslation.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  stock: number;

  @OneToMany(
    () => ProductTranslationEntity,
    (translation) => translation.product,
    { cascade: true },
  )
  translations: ProductTranslationEntity[];
}
