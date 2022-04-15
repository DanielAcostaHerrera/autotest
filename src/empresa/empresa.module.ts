import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from 'src/models/entities/Empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Empresa
  ])],
  controllers: [EmpresaController],
  providers: [EmpresaService]
})
export class EmpresaModule {}
