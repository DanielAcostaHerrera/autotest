import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Turno } from "./Turno.entity";
import { TrabajadorHorario } from "./TrabajadorHorario.entity";

@Index("IXFK_horario_turno", ["idTurno"], {})
@Entity("horario", { schema: "achs-dev" })
export class Horario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_horario" })
  idHorario: number;

  @Column("int", { name: "id_turno", nullable: true })
  idTurno: number | null;

  @ManyToOne(() => Turno, (turno) => turno.horarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_turno", referencedColumnName: "idTurno" }])
  turno: Turno;

  @OneToMany(
    () => TrabajadorHorario,
    (trabajadorHorario) => trabajadorHorario.horario
  )
  trabajadorHorarios: TrabajadorHorario[];
}
