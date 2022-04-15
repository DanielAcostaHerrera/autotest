import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrabajadorMuestra } from "./TrabajadorMuestra.entity";

@Entity("autotest", { schema: "achs-dev" })
export class Autotest {
  @PrimaryGeneratedColumn({ type: "int", name: "id_autotest" })
  idAutotest: number;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.autotest
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
