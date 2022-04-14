import { Column, Entity, OneToMany } from "typeorm";
import { Sucursal } from "./Sucursal";

@Entity("empresa", { schema: "achs-dev" })
export class Empresa {
  @Column("int", { primary: true, name: "id_empresa" })
  idEmpresa: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.empresa)
  sucursales: Sucursal[];
}
