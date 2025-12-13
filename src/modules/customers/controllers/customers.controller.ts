import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerDto } from '@/src/libs/models/dtos/customers/Customer.dto';
import { CustomersService } from '../services/customers.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiBody({
    description: 'Data for creating a new cusotomer',
    type: CustomerDto,
  })
  @Post()
  createCustomer(@Body() data: CustomerDto) {
    return this.customersService.createCustomer(data);
  }

  @Get()
  getCustomers() {
    return this.customersService.getCustomers();
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomer(id);
  }

  @ApiBody({
    description: 'Data for updating a customer by ID',
    type: CustomerDto,
  })
  @Put(':id')
  updateCustomer(@Param('id') id: string, @Body() data: CustomerDto) {
    return this.customersService.updateCustomer({ id, data });
  }

  @ApiBody({
    description: 'Data for deleting a customer by ID',
    type: CustomerDto,
  })
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
