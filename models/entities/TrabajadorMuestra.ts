import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Autotest } from "./Autotest";
import { Test } from "./Test";
import { Trabajador } from "./Trabajador";
import { Usuario } from "./Usuario";

@Index("IXFK_trabajador_muestra_autotest", ["idAutotest"], {})
@Index("IXFK_trabajador_muestra_test", ["idTest"], {})
@Index("IXFK_trabajador_muestra_trabajador", ["idTrabajador"], {})
@Index("IXFK_trabajador_muestra_usuario", ["idUsuario"], {})
@Entity("trabajador_muestra", { schema: "achs-dev" })
export class TrabajadorMuestra {
  @Column("int", { primary: true, name: "id_muestra" })
  idMuestra: number;

  @Column("int", { name: "id_trabajador", nullable: true })
  idTrabajador: number | null;

  @Column("int", { name: "id_autotest", nullable: true })
  idAutotest: number | null;

  @Column("int", { name: "id_test", nullable: true })
  idTest: number | null;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("varchar", { name: "tipo_test", nullable: true, length: 50 })
  tipoTest: string | null;

  @Column("varchar", { name: "fecha", nullable: true, length: 50 })
  fecha: string | null;

  @Column("varchar", { name: "resultado", nullable: true, length: 50 })
  resultado: string | null;

  @Column("varchar", { name: "imagen", nullable: true, length: 50 })
  imagen: string | null;

  @Column("varchar", { name: "estado", nullable: true, length: 50 })
  estado: string | null;

  @Column("varchar", { name: "motivo", nullable: true, length: 50 })
  motivo: string | null;

  @ManyToOne(() => Autotest, (autotest) => autotest.trabajadorMuestras, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_autotest", referencedColumnName: "idAutotest" }])
  autotest: Autotest;

  @ManyToOne(() => Test, (test) => test.trabajadorMuestras, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_test", referencedColumnName: "idTest" }])
  test: Test;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.trabajadorMuestras, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  trabajador: Trabajador;

  @ManyToOne(() => Usuario, (usuario) => usuario.trabajadorMuestras, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  usuario: Usuario;
}
