import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Test } from "./Test.entity";
import { TrabajadorLaboratorio } from "./TrabajadorLaboratorio.entity";

@Entity("laboratorio", { schema: "achs-dev" })
export class Laboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "id_laboratorio" })
  idLaboratorio: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @OneToMany(() => Test, (test) => test.laboratorio)
  tests: Test[];

  @OneToMany(
    () => TrabajadorLaboratorio,
    (trabajadorLaboratorio) => trabajadorLaboratorio.laboratorio
  )
  trabajadorLaboratorios: TrabajadorLaboratorio[];
}
