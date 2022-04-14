import { Column, Entity, OneToMany } from "typeorm";
import { TrabajadorMuestra } from "./TrabajadorMuestra";

@Entity("autotest", { schema: "achs-dev" })
export class Autotest {
  @Column("int", { primary: true, name: "id_autotest" })
  idAutotest: number;

  @OneToMany(
    () => TrabajadorMuestra,
    (trabajadorMuestra) => trabajadorMuestra.autotest
  )
  trabajadorMuestras: TrabajadorMuestra[];
}
