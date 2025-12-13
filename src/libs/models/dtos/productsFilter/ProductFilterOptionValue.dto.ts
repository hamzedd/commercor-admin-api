import { IsArray, ValidateNested, ValidateIf, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductFilterTranslationDto } from '@/src/libs/models/dtos/productsFilter/ProductFilterTranslation.dto';

export class ProductFilterOptionValueDto {

    @ValidateIf((o: ProductFilterOptionValueDto) => !!o?.productFilterId)
    @IsUUID()
    productFilterId?: string;

    
    @ValidateIf((o: ProductFilterOptionValueDto) => !!o?.productFilterOptionId)
    @IsUUID()
    productFilterOptionId?: string;

    
    @ValidateIf((o: ProductFilterOptionValueDto) => !!o?.productId)
    @IsUUID()
    productId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductFilterTranslationDto)
    translations: ProductFilterTranslationDto[];
}
