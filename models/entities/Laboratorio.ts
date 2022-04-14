import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Test } from "./Test";
import { Trabajador } from "./Trabajador";

@Entity("laboratorio", { schema: "achs-dev" })
export class Laboratorio {
  @Column("int", { primary: true, name: "id_laboratorio" })
  idLaboratorio: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Test, (test) => test.laboratorio)
  tests: Test[];

  @ManyToMany(() => Trabajador, (trabajador) => trabajador.laboratorios)
  @JoinTable({
    name: "trabajador_laboratorio",
    joinColumns: [
      { name: "id_laboratorio", referencedColumnName: "idLaboratorio" },
    ],
    inverseJoinColumns: [
      { name: "id_trabajador", referencedColumnName: "idTrabajador" },
    ],
    schema: "achs-dev",
  })
  trabajadores: Trabajador[];
}
