import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Laboratorio } from "./Laboratorio.entity";
import { TrabajadorMuestra } from "./TrabajadorMuestra.entity";

@Index("IXFK_test_laboratorio", ["idLaboratorio"], {})
@Entity("test", { schema: "achs-dev" })
export class Test {
  @PrimaryGeneratedColumn({ type: "int", name: "id_test" })
  idTest: number;

  @Column("int", { name: "id_laboratorio", nullable: true })
  idLaboratorio: number | null;

  @ManyToOne(() => Laboratorio, (laboratorio) => laboratorio.tests, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_laboratorio", referencedColumnName: "idLaboratorio" },
  ])
  laboratorio: Laboratorio;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.test
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
