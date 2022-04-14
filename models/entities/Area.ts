import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Sucursal } from "./Sucursal";

@Index("IXFK_area_sucursal", ["idSucursal"], {})
@Entity("area", { schema: "achs-dev" })
export class Area {
  @Column("int", { primary: true, name: "id_area" })
  idArea: number;

  @Column("int", { name: "id_sucursal" })
  idSucursal: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.areas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "idSucursal" }])
  sucursal: Sucursal;
}
