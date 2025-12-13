import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDetailDto {
  @ApiProperty({ description: 'Key of the company detail', type: String })
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Value of the company detail', type: String })
  @IsNotEmpty()
  value: string;
}
