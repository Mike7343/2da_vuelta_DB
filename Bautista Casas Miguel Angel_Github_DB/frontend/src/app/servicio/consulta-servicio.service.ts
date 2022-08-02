import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaServicioService {
  /*------------RUTAS----------------------------------------------------*/
  url = 'http://localhost:3000/proyecto/paqueteria/rutas_completas';
  urlpostr = 'http://localhost:3000/proyecto/paqueteria/insert_ruta';
  urldeleter = 'http://localhost:3000/proyecto/paqueteria/delete_ruta/';
  urlputr = 'http://localhost:3000/proyecto/paqueteria/put_ruta/';
  urlputfk = 'http://localhost:3000/proyecto/paqueteria/rutas';
  /*-----------PAQUETES----------------------------------------------------*/
  urlget = 'http://localhost:3000/proyecto/paqueteria/get';
  urlgetfk = 'http://localhost:3000/proyecto/paqueteria/getFK';
  urlpost = 'http://localhost:3000/proyecto/paqueteria/post';
  urlput = 'http://localhost:3000/proyecto/paqueteria/put/';
  urldelete = 'http://localhost:3000/proyecto/paqueteria/delete/';
  /*-----------clientes----------------------------------------------------*/
  urlc = 'http://localhost:3000/proyecto/paqueteria/clientes';
  urlgetc = 'http://localhost:3000/proyecto/paqueteria/clientes/';
  urlpostc = 'http://localhost:3000/proyecto/paqueteria/clientes/nuevo';
  urldeletec = 'http://localhost:3000/proyecto/paqueteria/clientes/eliminar/';
  urlputc = 'http://localhost:3000/proyecto/paqueteria/clientes/edit/';
  /*-----------tipo_transporte----------------------------------------------------*/
  urlt = 'http://localhost:3000/proyecto/paqueteria/tipotransporte';
  /* urlgett = 'http://localhost:3000/proyecto/paqueteria/clientes/'; */
  urlpostt = 'http://localhost:3000/proyecto/paqueteria/inserttipotransporte';
  urldeletet = 'http://localhost:3000/proyecto/paqueteria/deletetipotransporte/';
  urlputt = 'http://localhost:3000/proyecto/paqueteria/puttipotransporte/';
    /*-----------transportista----------------------------------------------------*/
    urltr = 'http://localhost:3000/proyecto/paqueteria/transportista';
     urlgettr = 'http://localhost:3000/proyecto/paqueteria/transportistafk'; 
    urlposttr = 'http://localhost:3000/proyecto/paqueteria/posttransportista';
    urldeletetr = 'http://localhost:3000/proyecto/paqueteria/deletetransportista/';
    urlputtr = 'http://localhost:3000/proyecto/paqueteria/puttransportista/';


  constructor(private http: HttpClient) {
    console.log("Servicio Corriendo");
  }

  consultaBd(): Observable<any> {
    return this.http.get(this.url);
  }
  consultaBdfk(): Observable<any> {
    return this.http.get(this.urlputfk);
  }
  URLpostDBr(Inse: InsertDB): Observable<any> {
    console.log("Servicio", Inse.fk_direccion)
    return this.http.post
      (this.urlpostr, Inse);
  }
  URLdeleteBd(Id: any): Observable<Datos> {
    return this.http.delete(this.urldeleter + Id);
  }
  URLputDBr(InsertDB: InsertDB) {
    console.log('Service put ', this.urlputr + InsertDB.id_ruta)
    return this.http.put(this.urlputr + InsertDB.id_ruta, InsertDB);
  }
  /*------------------------------OTROS---------------------------*/
  /*-----------PAQUETES----------------------------------------------------*/

  URLgetDB(): Observable<any> {
    return this.http.get(this.urlget);
  }

  URLgetFKDB(): Observable<any> {
    return this.http.get(this.urlgetfk);
  }

  URLpostDB(DatosDB: DatosDB): Observable<any> {
    console.log("Servicio POST", DatosDB.fk_clientes, DatosDB.fk_envios, DatosDB.fk_tp_paquete, DatosDB.fk_pago);
    return this.http.post(this.urlpost, DatosDB);
  }

  URLputDB(DatosDB: DatosDB) {
    console.log('Service put ', this.urlput + DatosDB.id_paquete)
    return this.http.put(this.urlput + DatosDB.id_paquete, DatosDB);
  }

  URLdeleteDB(id_paquete: any) {
    console.log('Service Eliminar', id_paquete)
    return this.http.delete(this.urldelete + id_paquete);
  }
  /*-----------------------------------------clientes----------------------------------------------------*/
  // get clientes
  getClientes(): Observable<any> {
    return this.http.get(this.urlc);
  }
  getClientesfk(): Observable<any> {
    return this.http.get(this.urlgetc);
  }

  //get un cliente
  getUnCliente(id: any) {
    return this.http.get(this.urlgetc + id);
  }

  //agregar cliente
  addCliente(Inse: Insert): Observable<any> {
    console.log("servicio", Inse.nombre_cliente)
    return this.http.post(this.urlpostc, Inse);
  }

  //eliminar cliente
  deleteCliente(id: any) {
    return this.http.delete(this.urldeletec + id);
  }

  //modificar cliente
  editCliente(Cliente: Cliente) {
    console.log('Service put ', this.urlputc + Cliente.id_cliente)
    return this.http.put(this.urlputc + Cliente.id_cliente, Cliente);
  }

  /*-----------tipo_transporte----------------------------------------------------*/
  gettipotransporte(): Observable<any> {
    return this.http.get(this.urlt);
  }

  addtipotransporte(Inse: InsertDBt): Observable<any> {
    console.log("Servicio", Inse.tp_transporte)
    return this.http.post
      (this.urlpostt, Inse);
  }
  edittipotransporte(Datost: Datost) {
    console.log('Service put ', this.urlputc + Datost.id_tp_transporte)
    return this.http.put(this.urlputt + Datost.id_tp_transporte, Datost);
  }
  deletetipotransporte(id: any) {
    return this.http.delete(this.urldeletet + id);
  }

  /*-----------transportista----------------------------------------------------*/
  gettransportista(): Observable<any> {
    return this.http.get(this.urltr);
  }

  gettransportistafk(): Observable<any> {
    return this.http.get(this.urlgettr);
  }

  addtransportista(Inse: InsertDBtr): Observable<any> {
    console.log("Servicio", Inse.id_transportista)
    return this.http.post
      (this.urlposttr, Inse);
  }
  edittransportista(Datostr: Datostr) {
    console.log('Service put ', this.urlputtr + Datostr.id_transportista)
    return this.http.put(this.urlputtr + Datostr.id_transportista, Datostr);
  }
  deletetransportista(id: any) {
    return this.http.delete(this.urldeletetr + id);
  }

}
/*------------RUTAS----------------------------------------------------*/
export interface Datos {
  id_ruta?: number;
  nombre_ruta?: string;
  direccion?: string;
  Colonia?: string;
  CodigoPostal?: string;
  NombreMunicipio?: string;
  NombreEstado?: string;
  Pais?: string;
}

export interface InsertDB {
  nombre_ruta?: string;
  fk_direccion?: number;
  id_ruta?: number;
}

/*-----------OTROS----------------------------------------------------*/
/*-----------PAQUETES----------------------------------------------------*/
export interface GetDB {
  id_paquete?: number;
  nombre_cliente?: string;
  dir_envio?: string;
  contenido?: string;
  tp_pago?: string;
}

export interface DatosDB {
  fk_pago?: number;
  fk_tp_paquete?: number;
  fk_clientes?: number;
  fk_envios?: number;
  id_paquete?: number;
}

/*-----------------------------------------clientes----------------------------------------------------*/
export interface Cliente {

  id_cliente?: number;
  nombre_cliente?: string;
  correo?: string;
  numero_cliente?: string;
  contrasena?: string;
  confirmar_contrasena?: string;

}

export interface Insert {
  nombre_cliente?: string;
  correo?: string;
  numero_cliente?: string;
  contrasena?: string;
  confirmar_contrasena?: string;
  id_cliente?: number;

}
/*-----------------------------------------tipo_transporte----------------------------------------------------*/

export interface Datost {
  id_tp_transporte?: number;
  tp_transporte?: string;
  placas?: number;
}

export interface InsertDBt {
  id_tp_transporte?: number;
  tp_transporte?: string;
  placas?: number;
}
/*-----------------------------------------transportista----------------------------------------------------*/
export interface Datostr {

  id_transportista?: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  telefono?: number;
  tp_transporte?: string;
  nombre_ruta?: string;
  contenido?: string;

}

export interface InsertDBtr {
  id_transportista?: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  telefono?: number;
  fk_tp_transportes?: number;
  fk_rutas?: number;
  fk_paquete?: number;

}