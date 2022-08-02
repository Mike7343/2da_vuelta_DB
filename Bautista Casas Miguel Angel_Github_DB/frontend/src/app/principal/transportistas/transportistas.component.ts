import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaServicioService, Datostr, InsertDBtr } from 'src/app/servicio/consulta-servicio.service';

@Component({
  selector: 'app-transportistas',
  templateUrl: './transportistas.component.html',
  styleUrls: ['./transportistas.component.css']
})
export class TransportistasComponent implements OnInit {

  lista: Datostr[] = [];

  listaUpdate: InsertDBtr[] = [];

  data: InsertDBtr = {};

  constructor(private route: Router, private Ruta: ActivatedRoute, private consultaServicio: ConsultaServicioService) { }

  ngOnInit(): void {
    this.ejecutaConsulta();
  }

  ejecutaConsulta() {
    this.consultaServicio.gettransportista().subscribe(
      res => {
        console.log(res)
        this.lista = res;
      }
    );
    this.consultaServicio.gettransportistafk().subscribe(
      res => {
        console.log(res)
        this.listaUpdate = res;
      }
    );

  }

  EjecutaPostDB() {
    console.log(this.data)
    this.consultaServicio.addtransportista(this.data).subscribe(
      res => {
        console.log(res)
        this.lista = res
      }
    );
  }

  EjecutaEditDB_1(id_transportista: any) {
    const edit = this.listaUpdate.find(idlistaUpdate => idlistaUpdate.id_transportista === id_transportista)
    console.log('TS Editar:', edit)
    console.log('TS Editar Id:', edit?.id_transportista)

     this.data.id_transportista = edit?.id_transportista
    this.data.nombre = edit?.nombre
    this.data.apellido_paterno = edit?.apellido_paterno 
    this.data.apellido_materno = edit?.apellido_materno 
    this.data.telefono = edit?.telefono 
    this.data.fk_tp_transportes = edit?.fk_tp_transportes 
    this.data.fk_rutas = edit?.fk_rutas 
    this.data.fk_paquete = edit?.fk_paquete 

  }

   EjecutaEditDB_2() {
    console.log('TS Editar data:', this.data)
    this.consultaServicio.edittransportista(this.data).subscribe(
      res => { console.log(res) }
    )
  } 

  EjecutaDeleteDB(id: any) {
    console.log('Id: ', id)
    if (window.confirm("¿Seguro deseas eliminar?")) {
      this.consultaServicio.deletetransportista(id).subscribe(res => {
        console.log(res);
        this.ejecutaConsulta();
      }, (error) => {
        console.log(error);
      })
    }


  }

}
