import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity('company_details')
export class CompanyDetailEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  key: string;

  @Column()
  value: string;
}
