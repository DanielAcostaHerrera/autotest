import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './DataBaseConfig';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    /*TypeOrmModule.forRoot(DatabaseConfig),
    UsuariosModule*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
