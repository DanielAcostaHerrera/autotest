import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Turno } from "./Turno";
import { Trabajador } from "./Trabajador";

@Index("IXFK_horario_turno", ["idTurno"], {})
@Entity("horario", { schema: "achs-dev" })
export class Horario {
  @Column("int", { primary: true, name: "id_horario" })
  idHorario: number;

  @Column("int", { name: "id_turno", nullable: true })
  idTurno: number | null;

  @ManyToOne(() => Turno, (turno) => turno.horarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_turno", referencedColumnName: "idTurno" }])
  turno: Turno;

  @ManyToMany(() => Trabajador, (trabajador) => trabajador.horarios)
  @JoinTable({
    name: "trabajador_horario",
    joinColumns: [{ name: "id_horario", referencedColumnName: "idHorario" }],
    inverseJoinColumns: [
      { name: "id_trabajador", referencedColumnName: "idTrabajador" },
    ],
    schema: "achs-dev",
  })
  trabajadores: Trabajador[];
}
