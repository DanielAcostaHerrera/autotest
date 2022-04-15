import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Horario } from "./Horario.entity";
import { Sucursal } from "./Sucursal.entity";

@Index("IXFK_turno_sucursal", ["idSucursal"], {})
@Entity("turno", { schema: "achs-dev" })
export class Turno {
  @PrimaryGeneratedColumn({ type: "int", name: "id_turno" })
  idTurno: number;

  @Column("int", { name: "id_sucursal", nullable: true })
  idSucursal: number | null;

  @OneToMany(() => Horario, (horario) => horario.turno)
  horarios: Horario[];

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.turnos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "idSucursal" }])
  sucursal: Sucursal;
}
