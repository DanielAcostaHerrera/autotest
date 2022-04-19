import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrabajadorMuestra } from "./TrabajadorMuestra.entity";

@Entity("usuario", { schema: "achs-dev" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  idUsuario: number;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "firebase_uuid", length: 100 })
  firebaseUuid: string;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.usuario
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
