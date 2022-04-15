import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajadorDto } from './create-trabajador.dto';

export class UpdateTrabajadorDto extends PartialType(CreateTrabajadorDto) {
    idTrabajador: number;
    nombre: string | null;
}