import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  idArea: number;
  idSucursal: number;
  nombre: string | null;
}