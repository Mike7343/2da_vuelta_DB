import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaServicioService, Datos, InsertDB } from 'src/app/servicio/consulta-servicio.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  lista: Datos[] = [];
  listaUpdate: InsertDB[] = [];
  data: InsertDB = {};
  constructor(private route: Router, private Ruta: ActivatedRoute, private consultaServicio: ConsultaServicioService) { }

  ngOnInit(): void {
    this.ejecutaConsulta();
  }

  ejecutaConsulta() {
    this.consultaServicio.consultaBd().subscribe(
      res => {
        console.log(res)
        this.lista = res;
      }
    );
    this.consultaServicio.consultaBdfk().subscribe(
      res => {
        console.log(res)
        this.listaUpdate = res;
      }
    );
  }

  EjecutaPostDBr() {
    console.log(this.data)
    this.consultaServicio.URLpostDBr(this.data).subscribe(
      res => {
        console.log(res)
        this.lista = res
      }
    );
  }

  EjecutaDeleteDB(id: any) {
    console.log('Id: ', id)
    if (window.confirm("¿Seguro deseas eliminar?")) {
      this.consultaServicio.URLdeleteBd(id).subscribe(res => {
        console.log(res);
        this.ejecutaConsulta();
      }, (error) => {
        console.log(error);
      })
    }


  }

  EjecutaEditDB_1(id_ruta: any) {
    const edit = this.listaUpdate.find(idlistaUpdate => idlistaUpdate.id_ruta === id_ruta)
    console.log('TS Editar:', edit)
    console.log('TS Editar Id:', edit?.id_ruta)

    this.data.id_ruta = edit?.id_ruta
    this.data.nombre_ruta = edit?.nombre_ruta
    this.data.fk_direccion = edit?.fk_direccion


  }

  EjecutaEditDB_2() {
    console.log('TS Editar data:', this.data)
    this.consultaServicio.URLputDBr(this.data).subscribe(
      res => { console.log(res) }
    )
  }

}

