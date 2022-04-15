import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrabajadorHorario } from "./TrabajadorHorario.entity";
import { TrabajadorLaboratorio } from "./TrabajadorLaboratorio.entity";
import { TrabajadorMuestra } from "./TrabajadorMuestra.entity";

@Entity("trabajador", { schema: "achs-dev" })
export class Trabajador {
  @PrimaryGeneratedColumn({ type: "int", name: "id_trabajador" })
  idTrabajador: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(
    () => TrabajadorHorario,
    (trabajadorHorario) => trabajadorHorario.trabajador
  )
  trabajadorHorarios: TrabajadorHorario[];

  @OneToMany(
    () => TrabajadorLaboratorio,
    (trabajadorLaboratorio) => trabajadorLaboratorio.trabajador
  )
  trabajadorLaboratorios: TrabajadorLaboratorio[];

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.trabajador
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
