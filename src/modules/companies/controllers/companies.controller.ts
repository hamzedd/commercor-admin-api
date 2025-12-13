import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { CompanyDetailDto } from '@/src/libs/models/dtos/companies/CompanyDetail.dto';
import { CompaniesService } from '@/src/modules/companies/services/companies.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @ApiBody({
    description: 'Data for creating a new company',
    type: CompanyDetailDto,
  })
  @Post()
  createCompany(@Body() data: CompanyDetailDto) {
    return this.companiesService.createCompany(data);
  }

  @Get()
  getCompany() {
    return this.companiesService.getCompany();
  }

  @ApiBody({
    description: 'Data for deleting a company by ID',
    type: CompanyDetailDto,
  })
  @Delete(':id')
  deleteCompany(@Param('id') id: string) {
    return this.companiesService.deleteCompany(id);
  }

  @ApiBody({
    description: 'Data for updating a company by ID',
    type: CompanyDetailDto,
  })
  @Put(':id')
  updateCompany(@Param('id') id: string, @Body() data: CompanyDetailDto) {
    return this.companiesService.updateCompany({ id, data });
  }
}
