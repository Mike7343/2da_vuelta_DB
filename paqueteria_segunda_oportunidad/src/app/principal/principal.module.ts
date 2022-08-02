import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RecuperarpasswordComponent } from './recuperarpassword/recuperarpassword.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { FormsModule } from '@angular/forms';
import { RutasComponent } from './rutas/rutas.component';
import { TransportesComponent } from './transportes/transportes.component';
import { TransportistasComponent } from './transportistas/transportistas.component';


@NgModule({
  declarations: [
     LoginComponent,
    MenuComponent,
    RecuperarpasswordComponent,
    RutasComponent,
    ClientesComponent,
    PaquetesComponent,
    TransportesComponent,
    TransportistasComponent
  
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    FormsModule
  ]
})
export class PrincipalModule { }
