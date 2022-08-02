import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ConsultaServicioService, GetDB, DatosDB}from 'src/app/servicio/consulta-servicio.service'

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {

  constructor(private route: Router, private Ruta:ActivatedRoute, private ConsultaServicio:ConsultaServicioService) { }

  lista:GetDB[]=[];
  listaFK:DatosDB[]=[];
  data:DatosDB={};

  ngOnInit(): void {
    this.EjecutaGetDB();
  }

  EjecutaGetDB(){
    this.ConsultaServicio.URLgetDB().subscribe(
      res => {console.log(res)
      this.lista=res}
    );
    
    this.ConsultaServicio.URLgetFKDB().subscribe(
      res => {console.log(res)
      this.listaFK=res}
    );
  }
  
  EjecutaPostDB(){
    console.log(this.data)
    this.ConsultaServicio.URLpostDB(this.data).subscribe(
      res => {console.log(res)
      this.lista=res}
    );
  }

  EjecutaEditDB_1(id_paquete:any){
    const edit = this.listaFK.find(idlistafk => idlistafk.id_paquete === id_paquete)
    console.log('TS Editar:', edit)
    console.log('TS Editar Id:', edit?.id_paquete)

    this.data.id_paquete = edit?.id_paquete
    this.data.fk_pago = edit?.fk_pago
    this.data.fk_tp_paquete = edit?.fk_tp_paquete
    this.data.fk_clientes = edit?.fk_clientes
    this.data.fk_envios = edit?.fk_envios
  }

  EjecutaEditDB_2(){
    console.log('TS Editar data:', this.data)
    this.ConsultaServicio.URLputDB(this.data).subscribe(
      res => {console.log(res)}
    )
  }

  EjecutaDeleteDB(id_paquete:any){
    const elimina = this.lista.find(idlista => idlista.id_paquete === id_paquete)
    console.log('resultado:', elimina)
    console.log('TS Eliminar:', id_paquete)
    this.ConsultaServicio.URLdeleteDB(id_paquete).subscribe(
      res => {console.log(res)}
    )
  }

  Paquemexinfo(){
    this.route.navigate(['paquemexinfo'])
  }
  Guia(){
    this.route.navigate(['guiatransporte'])
  }

}
