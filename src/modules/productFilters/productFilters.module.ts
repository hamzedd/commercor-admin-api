import { Module } from '@nestjs/common';
import { ProductFiltersService } from './services/productFilters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFilterEntity } from '@/src/libs/models/entities/productFilter/ProductFilter.entity';
import { ProductFiltersController } from '@/src/modules/productFilters/controllers/productFilters.controller';
import { ProductFilterOptionsController } from '@/src/modules/productFilters/controllers/productFilterOptions.controller';
import { ProductFilterOptionsService } from '@/src/modules/productFilters/services/productFilterOptions.service';
import { ProductFilterTranslationsEntity } from '@/src/libs/models/entities/productFilter/ProductFilterTranslation.entity';
import { ProductFilterOptionEntity } from '@/src/libs/models/entities/productFilter/ProductFilterOption.entity';
import { ProductFilterOptionTranslationEntity } from '@/src/libs/models/entities/productFilter/ProductFilterOptionTranslation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductFilterEntity,
      ProductFilterTranslationsEntity,
      ProductFilterOptionEntity,
      ProductFilterOptionTranslationEntity,
    ]),
  ],
  controllers: [ProductFiltersController, ProductFilterOptionsController],
  providers: [ProductFiltersService, ProductFilterOptionsService],
})
export class ProductFiltersModule {}
