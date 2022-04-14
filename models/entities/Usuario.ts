import { Column, Entity, OneToMany } from "typeorm";
import { TrabajadorMuestra } from "./TrabajadorMuestra";

@Entity("usuario", { schema: "achs-dev" })
export class Usuario {
  @Column("int", { primary: true, name: "id_usuario" })
  idUsuario: number;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.usuario
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
