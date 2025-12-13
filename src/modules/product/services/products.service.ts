import { ProductDto } from '@/src/libs/models/dtos/products/Product.dto';
import { ProductEntity } from '@/src/libs/models/entities/product/Product.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductTranslationEntity } from '@/src/libs/models/entities/product/ProductTranslation.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(data: ProductDto) {
    const slugExists = await this.productRepository.find({
      where: {
        translations: {
          slug: In(data.translations.map((t) => t.slug)),
        },
      },
    });

    if (slugExists.length > 0) {      
      throw new NotFoundException(`The slug already exists.`);
    }
    

    // if (slugExists.length > 0) {
    //   const existingSlugs = slugExists
    //     .map((product) =>
    //       product.translations
    //         .map((t) => t.slug)
    //         .filter((slug) => data.translations.some((dt) => dt.slug === slug)),
    //     )
    //     .flat();
    //   throw new BadRequestException(
    //     `The following slugs already exist: ${existingSlugs.join(', ')}`,
    //   );
    // }

    const product = this.productRepository.create({
      ...data,
    });
    await this.productRepository.save(product);

    return HttpStatus.CREATED;
  }

  async getProducts() {
    return this.productRepository.find({
      relations: ['translations'],
    });
  }

  async getProduct(id: string) {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id },
        relations: ['translations'],
      });
    } catch {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
  }

  async updateProduct({ id, data }: { id: string; data: ProductDto }) {
    await this.productRepository.manager.transaction(async (manager) => {
      const productRepo = manager.getRepository(ProductEntity);
      const translationRepo = manager.getRepository(ProductTranslationEntity);

      const product = await productRepo.findOneOrFail({
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });

      Object.keys(data).forEach((key) => {
        if (key !== 'translations') {
          product[key] = data[key];
        }
      });

      await translationRepo.delete({ productId: id });

      product.translations = Array.isArray(data.translations)
        ? data.translations.map((t) =>
            translationRepo.create({
              ...t,
              productId: id,
              product,
            }),
          )
        : [];

      await productRepo.save(product);
    });

    return { message: 'Brand updated successfully' };
  }

  async deleteProduct(id: string) {
    try {
      await this.productRepository.findOneByOrFail({
        id,
      });
    } catch {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }

    await this.productRepository.softDelete(id);

    return HttpStatus.OK;
  }
}
