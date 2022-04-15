import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './DataBaseConfig';
import { EmpresaModule } from './empresa/empresa.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { AreaModule } from './area/area.module';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    EmpresaModule,
    SucursalModule,
    AreaModule,
    TrabajadorModule,
    LaboratorioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
