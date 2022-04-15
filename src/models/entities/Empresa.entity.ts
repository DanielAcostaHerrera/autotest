import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "./Sucursal.entity";

@Entity("empresa", { schema: "achs-dev" })
export class Empresa {
  @PrimaryGeneratedColumn({ type: "int", name: "id_empresa" })
  idEmpresa: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.empresa)
  sucursales: Sucursal[];
}
