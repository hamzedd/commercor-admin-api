import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { ProductEntity } from '@/src/libs/models/entities/product/Product.entity';

@Entity('product_translations')
export class ProductTranslationEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity, (Product) => Product.translations)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  productId: string;

  @Column()
  lang: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  metaTitle: string;

  @Column()
  metaDescription: string;
}
