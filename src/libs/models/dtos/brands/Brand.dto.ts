import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BrandTranslationDto } from '@/src/libs/models/dtos/brands/BrandTranslation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BrandDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  imagePath: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  rank: number;

  @ApiProperty({ type: () => [BrandTranslationDto] })
  @ValidateNested({ each: true })
  @Type(() => BrandTranslationDto)
  @ArrayMinSize(1, { message: 'At least one translation is required.' })
  translations: BrandTranslationDto[];
}
