import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaServicioService, Datost, InsertDBt } from 'src/app/servicio/consulta-servicio.service';

@Component({
  selector: 'app-transportes',
  templateUrl: './transportes.component.html',
  styleUrls: ['./transportes.component.css']
})
export class TransportesComponent implements OnInit {

  lista: Datost[] = [];

  listaUpdate: InsertDBt[] = [];

  data: InsertDBt = {};

  constructor(private route: Router, private Ruta: ActivatedRoute, private consultaServicio: ConsultaServicioService) { }

  ngOnInit(): void {
    this.ejecutaConsulta();
  }

  ejecutaConsulta() {
    this.consultaServicio.gettipotransporte().subscribe(
      res => {
        console.log(res)
        this.lista = res;
      }
    );
    this.consultaServicio.gettipotransporte().subscribe(
      res => {
        console.log(res)
        this.listaUpdate = res;
      }
    );

  }

  EjecutaPostDB() {
    console.log(this.data)
    this.consultaServicio.addtipotransporte(this.data).subscribe(
      res => {
        console.log(res)
        this.lista = res
      }
    );
  }

  EjecutaEditDB_1(id_tp_transporte: any) {
    const edit = this.listaUpdate.find(idlistaUpdate => idlistaUpdate.id_tp_transporte === id_tp_transporte)
    console.log('TS Editar:', edit)
    console.log('TS Editar Id:', edit?.id_tp_transporte)

     this.data.tp_transporte = edit?.tp_transporte
    this.data.placas = edit?.placas
    this.data.id_tp_transporte = edit?.id_tp_transporte 

  }

   EjecutaEditDB_2() {
    console.log('TS Editar data:', this.data)
    this.consultaServicio.edittipotransporte(this.data).subscribe(
      res => { console.log(res) }
    )
  } 

  EjecutaDeleteDB(id: any) {
    console.log('Id: ', id)
    if (window.confirm("¿Seguro deseas eliminar?")) {
      this.consultaServicio.deletetipotransporte(id).subscribe(res => {
        console.log(res);
        this.ejecutaConsulta();
      }, (error) => {
        console.log(error);
      })
    }


  }

}


