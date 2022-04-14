import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Horario } from "./Horario";
import { Laboratorio } from "./Laboratorio";
import { TrabajadorMuestra } from "./TrabajadorMuestra";

@Entity("trabajador", { schema: "achs-dev" })
export class Trabajador {
  @Column("int", { primary: true, name: "id_trabajador" })
  idTrabajador: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @ManyToMany(() => Horario, (horario) => horario.trabajadores)
  horarios: Horario[];

  @ManyToMany(() => Laboratorio, (laboratorio) => laboratorio.trabajadores)
  laboratorios: Laboratorio[];

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.trabajador
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
