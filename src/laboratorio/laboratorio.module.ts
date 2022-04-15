import { Module } from '@nestjs/common';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioController } from './laboratorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from 'src/models/entities/Laboratorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Laboratorio
  ])],
  controllers: [LaboratorioController],
  providers: [LaboratorioService]
})
export class LaboratorioModule {}
