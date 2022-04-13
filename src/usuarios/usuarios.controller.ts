import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { DEFAULT_GRAPHQL_CONTEXT } from 'src/auth.guard';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { CreateUsuarioInput } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  //@UseGuards(new AuthGuard())
  create(@Body() createUsuarioInput: CreateUsuarioInput) {
    return this.usuariosService.save(createUsuarioInput);
  }

  @Post()
  //@UseGuards(new AuthGuard())
  refreshToken(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios) {
    return this.usuariosService.refreshToken(usuario);
  }

  @Post(':id')
  //@UseGuards(new AuthGuard())
  forcePasswordUsuario(
    @Param('id') id: number) {
    return this.usuariosService.forcePassword(id);
  }

  @Post(':id/:contrasenaVieja/:contrasenaNueva/:contrasenaNuevaConfirmar')
  //@UseGuards(new AuthGuard())
  modifyPasswordUsuario(
    @Param('id') id: number,
    @Param('contrasenaVieja') contrasenaVieja: string,
    @Param('contrasenaNueva') contrasenaNueva: string,
    @Param('contrasenaNuevaConfirmar') contrasenaNuevaConfirmar: string,
    ) {
    return this.usuariosService.modificarContrasena(id,contrasenaVieja,contrasenaNueva,contrasenaNuevaConfirmar);
  }

  @Get()
  //@UseGuards(new AuthGuard())
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':nombreUsuario/:contrasena')
  //@UseGuards(new AuthGuard())
  autenticarUsuario(@Param('nombreUsuario') nombreUsuario: string,@Param('contrasena') contrasena: string) {
    return this.usuariosService.autenticar(nombreUsuario,contrasena);
  }

  @Get(':id')
  //@UseGuards(new AuthGuard())
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Delete(':id')
  //@UseGuards(new AuthGuard())
  remove(
    @Context(DEFAULT_GRAPHQL_CONTEXT) usuario: Usuarios,
    @Param('id') id: number) {
    return this.usuariosService.remove(usuario,id);
  }
}
