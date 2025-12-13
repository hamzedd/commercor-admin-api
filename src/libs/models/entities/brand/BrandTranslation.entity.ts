import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/src/libs/models/entities/BaseEntity';
import { BrandEntity } from '@/src/libs/models/entities/brand/Brand.entity';

@Entity('brand_translations')
export class BrandTranslationEntity extends BaseEntity {
  @ManyToOne(() => BrandEntity, (brand) => brand.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @Column()
  brandId: string;

  @Column()
  lang: string;

  @Column({
    unique: true,
  })
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
