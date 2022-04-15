import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/models/entities/Area.entity';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(@InjectRepository(Area) public readonly areasRepository: Repository<Area>) {}

  async create(createAreaDto: CreateAreaDto) : Promise<Area> {
    const area = this.areasRepository.findOne({nombre: createAreaDto.nombre});

    if (area != null) {
      throw new UnprocessableEntityException('Ya existe un área con ese nombre.');
    }

    return await this.areasRepository.save(createAreaDto);
  }

  async findAll(): Promise<Area[]> {
    return await this.areasRepository.find({relations:['sucursal']});
  }

  async findOne(id: number) : Promise<Area> {
    const area = await this.areasRepository.findOne(id,{relations:['sucursal']});

    if (!area) {
      throw new NotFoundException('Área no encontrada.');
    }
    return area
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) : Promise<Area> {
    
    let area = await this.areasRepository.findOne({nombre: updateAreaDto.nombre});

    if (area != null && area.idArea != id)  {
      throw new UnprocessableEntityException('Ya existe un área con ese nombre.');
   }
    
   area = await this.areasRepository.findOne(id);

    if (!area) {
      throw new NotFoundException('Área no encontrada.');
    }

    if(updateAreaDto.nombre)
      area.nombre = updateAreaDto.nombre;
    if(updateAreaDto.idSucursal)
      area.idSucursal = updateAreaDto.idSucursal;

    return await this.areasRepository.save(area);
  }

  async remove(id: number) : Promise<any> {
    const area = await this.findOne(id);

    if (!area) {
      throw new NotFoundException('Área no encontrada.');
    }

    return await this.areasRepository.remove(area);
  }
}
