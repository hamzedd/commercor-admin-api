import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { BrandDto } from '@/src/libs/models/dtos/brands/Brand.dto';
import { BrandsService } from '@/src/modules/brands/services/brands.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBody({
    description: 'Data for creating a new brand',
    type: BrandDto,
  })
  @Post()
  createBrand(@Body() data: BrandDto) {
    return this.brandsService.createBrand(data);
  }

  @Get()
  getBrands() {
    return this.brandsService.getBrands();
  }

  @Get(':id')
  getBrand(@Param('id') id: string) {
    return this.brandsService.getBrand(id);
  }

  @ApiBody({
    description: 'Data for deleting a brand by ID',
    type: BrandDto,
  })
  @Delete(':id')
  deleteBrand(@Param('id') id: string) {
    return this.brandsService.deleteBrand(id);
  }

  @ApiBody({
    description: 'Data for updating a brand by ID',
    type: BrandDto,
  })
  @Put(':id')
  updateBrand(@Param('id') id: string, @Body() data: BrandDto) {
    return this.brandsService.updateBrand({ id, data });
  }
}
