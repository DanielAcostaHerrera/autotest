import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajador } from 'src/models/entities/Trabajador.entity';
import { Repository } from 'typeorm';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Injectable()
export class TrabajadorService {
  constructor(@InjectRepository(Trabajador) public readonly trabajadorRepository: Repository<Trabajador>) {}

  async create(createTrabajadorDto: CreateTrabajadorDto) : Promise<Trabajador> {
    const trabajador = this.trabajadorRepository.findOne({nombre: createTrabajadorDto.nombre});

    if (trabajador != null) {
      throw new UnprocessableEntityException('Ya existe un trabajador con ese nombre.');
    }

    return await this.trabajadorRepository.save(createTrabajadorDto);
  }

  async findAll(): Promise<Trabajador[]> {
    return await this.trabajadorRepository.find({relations:['horarios','laboratorios','trabajadorMuestras']});
  }

  async findOne(id: number) : Promise<Trabajador> {
    const trabajador = await this.trabajadorRepository.findOne(id,{relations:['horarios','laboratorios','trabajadorMuestras']});

    if (!trabajador) {
      throw new NotFoundException('Trabajador no encontrado.');
    }
    return trabajador
  }

  async update(id: number, updateTrabajadorDto: UpdateTrabajadorDto) : Promise<Trabajador> {

    let trabajador = await this.trabajadorRepository.findOne({nombre: updateTrabajadorDto.nombre});

    if (trabajador != null && trabajador.idTrabajador != id) {
      throw new UnprocessableEntityException('Ya existe un trabajador con ese nombre.');
    }

    trabajador = await this.trabajadorRepository.findOne(id);

    if (!trabajador) {
      throw new NotFoundException('Trabajador no encontrado.');
    }

    if(updateTrabajadorDto.nombre)
      trabajador.nombre = updateTrabajadorDto.nombre;

    return await this.trabajadorRepository.save(trabajador);
  }

  async remove(id: number) : Promise<any> {
    const trabajador = await this.findOne(id);

    if (!trabajador) {
      throw new NotFoundException('Trabajador no encontrado.');
    }

    return await this.trabajadorRepository.remove(trabajador);
  }
}
