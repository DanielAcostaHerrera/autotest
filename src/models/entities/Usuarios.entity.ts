import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("IX_Usuarios_NombreUsuario", ["nombreUsuario"], { unique: true })
@Index("PK_Usuarios", ["idUsuario"], { unique: true })  
@Entity("Usuario", { schema: "test.dbo" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "IdUsuario" })
  idUsuario: number;

  @Column("nvarchar", { name: "NombreUsuario", length: 20 })
  nombreUsuario: string;

  @Column("nvarchar", { name: "Contrasena", length: 200 })
  contrasena: string;

  token: string;
}
