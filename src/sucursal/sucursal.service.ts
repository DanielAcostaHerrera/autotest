import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from 'src/models/entities/Sucursal.entity';
import { Repository } from 'typeorm';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalService {
  constructor(@InjectRepository(Sucursal) public readonly sucursalRepository: Repository<Sucursal>) {}

  async create(createSucursalDto: CreateSucursalDto) : Promise<Sucursal> {
    const sucursal = this.sucursalRepository.findOne({nombre: createSucursalDto.nombre});

    if (sucursal != null) {
      throw new UnprocessableEntityException('Ya existe una sucursal con ese nombre.');
    }

    return await this.sucursalRepository.save(createSucursalDto);
  }

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find({relations:['areas','empresa','turnos']});
  }

  async findOne(id: number) : Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOne(id,{relations:['areas','empresa','turnos']});

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada.');
    }
    return sucursal
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) : Promise<Sucursal> {

    let sucursal = await this.sucursalRepository.findOne({nombre: updateSucursalDto.nombre});

    if (sucursal != null && sucursal.idSucursal != id) {
      throw new UnprocessableEntityException('Ya existe una sucursal con ese nombre.');
    }

    sucursal = await this.sucursalRepository.findOne(id);

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada.');
    }

    if(updateSucursalDto.nombre)
      sucursal.nombre = updateSucursalDto.nombre;
    if(updateSucursalDto.idEmpresa)
      sucursal.idEmpresa = updateSucursalDto.idEmpresa

    return await this.sucursalRepository.save(sucursal);
  }

  async remove(id: number) : Promise<any> {
    const sucursal = await this.findOne(id);

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada.');
    }

    return await this.sucursalRepository.remove(sucursal);
  }
}
