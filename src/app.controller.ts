import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  //@Get (':mensaje')
  //getMensaje(@Param('mensaje') mensaje: string): string {
    //return this.appService.getMensaje(mensaje);
  //}
}
