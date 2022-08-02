import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ConsultaServicioService, Datos, Insert, InsertDB } from 'src/app/servicio/consulta-servicio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //variable
  //variable
  ListarCliente: Cliente[] = [];
  datai: Cliente [] = [];
  data: Insert = {};

  constructor(private ConsultaServicioService: ConsultaServicioService, private router: Router) { }

  ngOnInit(): void {
    this.listarCliente();
  }
  listarCliente() {
    this.ConsultaServicioService.getClientes().subscribe(
      res => {
        console.log(res)
        this.ListarCliente = res;
      }
    );
    this.ConsultaServicioService.getClientesfk().subscribe(
      res => {
        console.log(res)
        this.datai = res;
      }
    );
  }

  agregar() {
    console.log(this.data)
    this.ConsultaServicioService.addCliente(this.data).subscribe(
      res => {
        console.log(res)
        this.ListarCliente = res;

      }
    );
  }

  eliminar(id: any) {
    console.log('id:', id)
    if (window.confirm("¿quieres elimnar ?")) {
      this.ConsultaServicioService.deleteCliente(id).subscribe(
        res => {
          console.log(res)
          this.listarCliente();
        },
        (error) => {
          console.log(error)

        })
    }
  }

  modificar(id_cliente: any) {
    const edit = this.datai.find(datai => datai.id_cliente === id_cliente)
    console.log('TS Editar:', edit)
    console.log('TS Editar Id:', edit?.id_cliente)



    this.data.nombre_cliente=edit?.nombre_cliente
    this.data.correo=edit?.correo
    this.data.numero_cliente=edit?.numero_cliente
    this.data.contrasena=edit?.contrasena
    this.data.confirmar_contrasena=edit?.confirmar_contrasena
    this.data.id_cliente = edit?.id_cliente
  }

  modificar_2() {
    console.log('TS Editar data:', this.data)
    this.ConsultaServicioService.editCliente(this.data).subscribe(
      res => { console.log(res) }
    )
  } 

  /* EjecutaEditDB_2() {
    console.log('TS Editar data:', this.data)
    this.consultaServicio.URLputDBr(this.data).subscribe(
      res => { console.log(res) }
    )
  }  */




}
