import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDetailEntity } from '@/src/libs/models/entities/company/CompanyDetail.entity';
import { CompanyDetailDto } from '@/src/libs/models/dtos/companies/CompanyDetail.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyDetailEntity)
    private readonly companyRepository: Repository<CompanyDetailEntity>,
  ) {}

  async createCompany(data: CompanyDetailDto) {
    const company = this.companyRepository.create({
      ...data,
    });
    await this.companyRepository.save(company);

    return HttpStatus.CREATED;
  }

  async getCompany() {
    try {
      return await this.companyRepository.findOneOrFail({});
    } catch {
      throw new NotFoundException(`Company not found`);
    }
  }

  async updateCompany({ id, data }: { id: string; data: CompanyDetailDto }) {
    try {
      await this.companyRepository.findOneByOrFail({
        id,
      });
    } catch {
      throw new NotFoundException(`Company with ID: ${id} not found`);
    }

    await this.companyRepository.update(id, {
      ...data,
    });

    return HttpStatus.OK;
  }

  async deleteCompany(id: string) {
    try {
      await this.companyRepository.findOneByOrFail({
        id,
      });
    } catch {
      throw new NotFoundException(`Company with ID: ${id} not found`);
    }

    await this.companyRepository.softDelete(id);

    return HttpStatus.OK;
  }
}
