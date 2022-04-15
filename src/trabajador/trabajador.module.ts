import { Module } from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajador } from 'src/models/entities/Trabajador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Trabajador
  ])],
  controllers: [TrabajadorController],
  providers: [TrabajadorService]
})
export class TrabajadorModule {}
