import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratorioDto } from './create-laboratorio.dto';

export class UpdateLaboratorioDto extends PartialType(CreateLaboratorioDto) {
    idLaboratorio: number | null;
    nombre: string | null;
}
