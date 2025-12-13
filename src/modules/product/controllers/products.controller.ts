import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductDto } from '@/src/libs/models/dtos/products/Product.dto';
import { ProductsService } from '@/src/modules/product/services/products.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBody({
    description: 'Data for creating a new product',
    type: ProductDto,
  })
  @Post()
  createProduct(@Body() data: ProductDto) {
    return this.productsService.createProduct(data);
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiBody({
    description: 'Data for updating a product by ID',
    type: ProductDto,
  })
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductDto) {
    return this.productsService.updateProduct({ id, data });
  }

  @ApiBody({
    description: 'Data for deleting a product by ID',
    type: ProductDto,
  })
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
