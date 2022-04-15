import { PartialType } from '@nestjs/mapped-types';
import { CreateSucursalDto } from './create-sucursal.dto';

export class UpdateSucursalDto extends PartialType(CreateSucursalDto) {
  idSucursal: number | null;
  idEmpresa: number | null;
  nombre: string | null;
}
