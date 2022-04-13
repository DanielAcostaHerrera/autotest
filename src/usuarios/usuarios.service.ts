import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'crypto';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { SECRET_KEY } from 'src/auth.guard';
import { CreateUsuarioInput } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuarios) public readonly usuariosRepository: Repository<Usuarios>) {}

  async save(createUsuarioInput: CreateUsuarioInput) : Promise<Usuarios> {
    var esNuevo = false;
    var id = createUsuarioInput.idUsuario;
    if(!id){
      esNuevo = true;
      createUsuarioInput.contrasena = createUsuarioInput.nombreUsuario + '*'+ new Date().getFullYear();
    }else {
      esNuevo = false;
    }


    if(createUsuarioInput.contrasena){
      const encryptedPassw = await bcrypt.genSalt(12).then(salt => {
        return bcrypt.hash(createUsuarioInput.contrasena, salt);     
    });  
    createUsuarioInput.contrasena = encryptedPassw.replace('$2a$12$', '');
  }
    
    return await this.usuariosRepository.save(createUsuarioInput);
  }

  async forcePassword(idUsuario: number) : Promise<Usuarios> {
    const usuario = await this.findOne(idUsuario); 
    usuario.contrasena = usuario.nombreUsuario + '*'+ new Date().getFullYear();
    return await this.save(usuario);    
  }

  async modificarContrasena(idUsuario: number, contrasenaVieja: string, contrasenaNueva: string, contrasenaNuevaConfirmar: string) : Promise<Usuarios>{

    return new Promise<Usuarios>(async (resolve, reject) => {
      const usuario = await this.findOne(idUsuario);
      const validPassw = bcrypt.compareSync(contrasenaVieja, '$2a$12$' + usuario.contrasena);
      if(!validPassw){
        reject('La contraseña actual es incorrecta');
      }
      else if(contrasenaNueva != contrasenaNuevaConfirmar){
        reject('La contraseña nueva y la contraseña de confirmación no coinciden');
      }
      else{ 
        usuario.contrasena = contrasenaNueva;  
        resolve(this.save(usuario)); 
      }
    });
  }
  
  async autenticar(nombreUsuario: string, contrasena: string) : Promise<Usuarios>{

    return new Promise<Usuarios>(async (resolve, reject) => {
      const usuario = await this.usuariosRepository.findOne({nombreUsuario});
      if(!usuario){
        reject('Usuario o contraseña incorrectos');
      }
      else{
        const validPassw = bcrypt.compareSync(contrasena, '$2a$12$' + usuario.contrasena);
        if(!validPassw){
          reject('Usuario o contraseña incorrectos');  
        }
        else{
          usuario.token = this.createToken(usuario)
          resolve(usuario);  
        }
      }
    });
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.usuariosRepository.find();
  }

  async findOne(id: number) : Promise<Usuarios> {
    return await this.usuariosRepository.findOne(id);
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const usuario = await this.findOne(id);
      if(usuario.idUsuario == usuarioToken.idUsuario){
        reject('No se puede eliminar el usuario que se encuentra autenticado actualmente');
      }
      else{
        resolve(this.usuariosRepository.remove(usuario));  
      }
    });
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const usuarios = await this.usuariosRepository.findByIds(id);
      var estaLoggeado = false;
      usuarios.forEach(usuario =>{
        if(usuario.idUsuario == usuarioToken.idUsuario){
          estaLoggeado = true;
        }
      })
      if(estaLoggeado){
        reject('No se puede eliminar el usuario que se encuentra autenticado actualmente');
      }
      else{
        var result = await this.usuariosRepository.remove(usuarios);
        if(result){
          var texto = "Eliminados los usuarios ";
          for (let index = 0; index < result.length; index++) {
            if(index != result.length -1)
              texto += result[index].nombreUsuario+", ";
            else
              texto += result[index].nombreUsuario;
          }
        }  
        resolve(result);  
      }
    });
  }

  private createToken (usuario: Usuarios){
    return jwt.sign({usuario},SECRET_KEY, {expiresIn: 900});
  }

  refreshToken (usuario: Usuarios){
    usuario.token = jwt.sign({usuario},SECRET_KEY, {expiresIn: 900});
    return usuario;
  }
}
