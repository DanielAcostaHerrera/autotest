import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity";
import { Horario } from "./Horario.entity";

@Index("trabajador_horario_FK", ["idTrabajador"], {})
@Index("trabajador_horario_UN", ["idHorario", "idTrabajador"], { unique: true })
@Entity("trabajador_horario", { schema: "achs-dev" })
export class TrabajadorHorario {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_horario" })
  idHorario: number;

  @Column("int", { name: "id_trabajador" })
  idTrabajador: number;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.trabajadorHorarios, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  trabajador: Trabajador;

  @ManyToOne(() => Horario, (horario) => horario.trabajadorHorarios, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_horario", referencedColumnName: "idHorario" }])
  horario: Horario;
}
