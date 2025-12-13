import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductTranslationDto } from '@/src/libs/models/dtos/products/ProductTranslation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Price of the product', type: Number, example: 99.99 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Available stock of the product', type: Number, example: 50 })
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ 
    type: () => [ProductTranslationDto], 
    description: 'Translations for the product (at least one required)' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  @ArrayMinSize(1, { message: 'At least one translation is required' })
  translations: ProductTranslationDto[];
}
