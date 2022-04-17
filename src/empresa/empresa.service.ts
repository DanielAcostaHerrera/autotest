import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/models/entities/Empresa.entity';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(@InjectRepository(Empresa) public readonly empresasRepository: Repository<Empresa>) {}

  async create(createEmpresaDto: CreateEmpresaDto) : Promise<Empresa> {
    const empresa = await this.empresasRepository.findOne({nombre: createEmpresaDto.nombre});

    if (empresa != null)  {
      throw new UnprocessableEntityException('Ya existe una empresa con ese nombre.');
    }

    return await this.empresasRepository.save(createEmpresaDto);
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresasRepository.find({relations:['sucursales']});
  }

  async findOne(id: number) : Promise<Empresa> {
    const empresa = await this.empresasRepository.findOne(id,{relations:['sucursales']});

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada.');
    }
    return empresa
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) : Promise<Empresa> {
    
    let empresa = await this.empresasRepository.findOne({nombre: updateEmpresaDto.nombre});

    if (empresa != null && empresa.idEmpresa != id)  {
       throw new UnprocessableEntityException('Ya existe una empresa con ese nombre.');
    }
    
     empresa = await this.findOne(id);

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada.');
    }

    if(updateEmpresaDto.nombre){
      empresa.nombre = updateEmpresaDto.nombre;
    }
     
    return await this.empresasRepository.save(empresa);
  }

  async remove(id: number) : Promise<any> {
    const empresa = await this.findOne(id);

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada.');
    }

    return await this.empresasRepository.remove(empresa);
  }
}

