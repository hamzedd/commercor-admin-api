import {
  ArrayMinSize,
  IsArray,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CategoryTranslationDto } from '@/src/libs/models/dtos/categories/CategoryTranslation.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  @ValidateIf((o: CategoryDto) => !!o?.parentId)
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    type: [CategoryTranslationDto],
    default: [
      {
        lang: 'GE',
        name: 'Sample Category',
        description: 'This is a sample category description.',
        slug: 'sample-category',
        metaTitle: 'Sample Category Meta Title',
        metaDescription: 'Sample Category Meta Description',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTranslationDto)
  @ArrayMinSize(1, { message: 'At least one translation is required.' })
  translations: CategoryTranslationDto[];
}
