import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity";
import { Laboratorio } from "./Laboratorio.entity";

@Index("trabajador_laboratorio_FK_1", ["idLaboratorio"], {})
@Index("trabajador_laboratorio_UN", ["idTrabajador", "idLaboratorio"], {
  unique: true,
})
@Entity("trabajador_laboratorio", { schema: "achs-dev" })
export class TrabajadorLaboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_trabajador" })
  idTrabajador: number;

  @Column("int", { name: "id_laboratorio" })
  idLaboratorio: number;

  @ManyToOne(
    () => Trabajador,
    (trabajador) => trabajador.trabajadorLaboratorios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  trabajador: Trabajador;

  @ManyToOne(
    () => Laboratorio,
    (laboratorio) => laboratorio.trabajadorLaboratorios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_laboratorio", referencedColumnName: "idLaboratorio" },
  ])
  laboratorio: Laboratorio;
}
