import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductFilterTranslationDto } from '@/src/libs/models/dtos/productsFilter/ProductFilterTranslation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductFilterOptionDto {
  @ApiProperty()
  productFilterId: string;

  @ApiProperty({
    type: [ProductFilterTranslationDto],
    default: [
      {
        lang: 'EN',
        name: 'Default Name',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductFilterTranslationDto)
  translations: ProductFilterTranslationDto[];
}
