import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/Products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@/src/libs/models/entities/product/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
