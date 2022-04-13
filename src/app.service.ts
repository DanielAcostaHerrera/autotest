import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMensaje(mensaje: string): string {
    return mensaje;
  }
}
