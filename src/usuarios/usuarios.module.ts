import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/models/entities/Usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Usuarios
  ])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
