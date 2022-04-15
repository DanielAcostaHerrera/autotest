import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrabajadorMuestra } from "./TrabajadorMuestra.entity";

@Entity("usuario", { schema: "achs-dev" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  idUsuario: number;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.usuario
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
