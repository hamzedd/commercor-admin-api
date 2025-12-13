import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDto } from '@/src/libs/models/dtos/categories/Category.dto';
import { CategoriesService } from '@/src/modules/categories/services/categories.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBody({
    description: 'Data for creating a new category',
    type: CategoryDto,
  })
  @Post()
  createCategory(@Body() data: CategoryDto) {
    return this.categoriesService.createCategory(data);
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiBody({
    description: 'Data for deleting a category by ID',
    type: CategoryDto,
  })
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @ApiBody({
    description: 'Data for updating a category by ID',
    type: CategoryDto,
  })
  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() data: CategoryDto) {
    return this.categoriesService.updateCategory(id, data);
  }
}
