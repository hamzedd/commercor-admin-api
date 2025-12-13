import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductFilterTranslationsEntity } from '@/src/libs/models/entities/productFilter/ProductFilterTranslation.entity';
import { ProductFilterTypeEnum } from '@/src/utils/enums/ProductFilterEnums';

@Entity('product_filters')
export class ProductFilterEntity extends BaseEntity {
  @Column()
  type: ProductFilterTypeEnum;

  @OneToMany(
    () => ProductFilterTranslationsEntity,
    (translation) => translation.productFilter,
    { cascade: true },
  )
  translations: ProductFilterTranslationsEntity[];
}
