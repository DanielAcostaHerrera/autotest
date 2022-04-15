import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratorio } from 'src/models/entities/Laboratorio.entity';
import { Repository } from 'typeorm';
import { CreateLaboratorioDto } from './dto/create-laboratorio.dto';
import { UpdateLaboratorioDto } from './dto/update-laboratorio.dto';

@Injectable()
export class LaboratorioService {
  constructor(@InjectRepository(Laboratorio) public readonly laboratoriosRepository: Repository<Laboratorio>) {}

  async create(createLaboratorioDto: CreateLaboratorioDto) : Promise<Laboratorio> {
    const laboratorio = this.laboratoriosRepository.findOne({nombre: createLaboratorioDto.nombre});

    if (laboratorio) {
      throw new UnprocessableEntityException('Ya existe un laboratorio con ese nombre.');
    }

    return await this.laboratoriosRepository.save(createLaboratorioDto);
  }

  async findAll(): Promise<Laboratorio[]> {
    return await this.laboratoriosRepository.find({relations:['tests','trabajadores']});
  }

  async findOne(id: number) : Promise<Laboratorio> {
    const laboratorio = await this.laboratoriosRepository.findOne(id,{relations:['tests','trabajadores']});

    if (!laboratorio) {
      throw new NotFoundException('Laboratorio no encontrado.');
    }
    return laboratorio
  }

  async update(id: number, updateLaboratorioDto: UpdateLaboratorioDto) : Promise<Laboratorio> {
    const laboratorio = await this.laboratoriosRepository.findOne(id);

    if (!laboratorio) {
      throw new NotFoundException('Laboratorio no encontrado.');
    }

    if(updateLaboratorioDto.nombre)
      laboratorio.nombre = updateLaboratorioDto.nombre;

    return await this.laboratoriosRepository.save(laboratorio);
  }

  async remove(id: number) : Promise<any> {
    const laboratorio = await this.findOne(id);

    if (!laboratorio) {
      throw new NotFoundException('Laboratorio no encontrado.');
    }

    return await this.laboratoriosRepository.remove(laboratorio);
  }
}
