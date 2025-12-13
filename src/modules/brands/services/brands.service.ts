import { BrandDto } from '@/src/libs/models/dtos/brands/Brand.dto';
import { BrandEntity } from '@/src/libs/models/entities/brand/Brand.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BrandTranslationEntity } from '@/src/libs/models/entities/brand/BrandTranslation.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(BrandTranslationEntity)
    private readonly brandTranslationRepository: Repository<BrandTranslationEntity>,
  ) {}

  async createBrand(data: BrandDto) {

    const slugs = data.translations.map(t => t.slug);
    const names = data.translations.map(t => t.name);

    const existingSlug = await this.brandTranslationRepository.findOne({
      where: { slug: In(slugs) },
    });

    if (existingSlug) {
      throw new NotFoundException(`The slug '${existingSlug.slug}' already exists.`);
    }

    const existingName = await this.brandTranslationRepository.findOne({
      where: { name: In(names) },
    });

    if (existingName) {
      throw new NotFoundException(`The name '${existingName.name}' already exists.`);
    }
  
    // const slugExists = await this.brandRepository.find({
    //   where: {
    //     translations: {
    //       slug: In(data.translations.map((t) => t.slug)),
    //     },
    //   },
    // });
    
    // if (slugExists.length > 0) {
    //   const existingSlugs = slugExists
    //     .map((brand) =>
    //       brand.translations
    //         .map((t) => t.slug)
    //         .filter((slug) => data.translations.some((dt) => dt.slug === slug)),
    //     )
    //     .flat();
    //   throw new BadRequestException(
    //     `The following slugs already exist: ${existingSlugs.join(', ')}`,
    //   );
    // }
    const brand = this.brandRepository.create({
      ...data,
    });
    await this.brandRepository.save(brand);

    return HttpStatus.CREATED;
  }

  async getBrands() {
    return this.brandRepository.find({
      relations: ['translations'],
    });
  }

  async getBrand(id: string) {
    try {
      return await this.brandRepository.findOne({
        where: { id },
        relations: ['translations'],
      });
    } catch {
      throw new NotFoundException(`Brand with ID: ${id} not found`);
    }
  }

  async updateBrand({ id, data }: { id: string; data: BrandDto }) {
    await this.brandRepository.manager.transaction(async (manager) => {
      const brandRepo = manager.getRepository(BrandEntity);
      const translationRepo = manager.getRepository(BrandTranslationEntity);

      const brand = await brandRepo.findOneOrFail({
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });

      if (data.imagePath !== undefined) {
        brand.imagePath = data.imagePath;
      }
      if (data.rank !== undefined) {
        brand.rank = data.rank;
      }

      await translationRepo.delete({ brandId: id });

      brand.translations = Array.isArray(data.translations)
        ? data.translations.map((t) =>
            translationRepo.create({
              ...t,
              brandId: id,
              brand,
            }),
          )
        : [];

      await brandRepo.save(brand);
    });

    return { message: 'Brand updated successfully' };
  }

  async deleteBrand(id: string) {
    try {
      await this.brandRepository.findOneByOrFail({
        id,
      });
    } catch {
      throw new NotFoundException(`Brand with ID: ${id} not found`);
    }

    await this.brandRepository.delete(id);

    return HttpStatus.OK;
  }
}
