import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Area } from "./Area";
import { Empresa } from "./Empresa";
import { Turno } from "./Turno";

@Index("IXFK_sucursal_empresa", ["idEmpresa"], {})
@Entity("sucursal", { schema: "achs-dev" })
export class Sucursal {
  @Column("int", { primary: true, name: "id_sucursal" })
  idSucursal: number;

  @Column("int", { name: "id_empresa" })
  idEmpresa: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Area, (area) => area.sucursal)
  areas: Area[];

  @ManyToOne(() => Empresa, (empresa) => empresa.sucursales, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "idEmpresa" }])
  empresa: Empresa;

  @OneToMany(() => Turno, (turno) => turno.sucursal)
  turnos: Turno[];
}
