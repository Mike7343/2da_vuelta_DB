import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { RecuperarpasswordComponent } from './recuperarpassword/recuperarpassword.component';
import { RutasComponent } from './rutas/rutas.component';
import { TransportesComponent } from './transportes/transportes.component';
import { TransportistasComponent } from './transportistas/transportistas.component';

const routes: Routes = [
  {path: "", children:[
    {path: "clientes", component: ClientesComponent},
    {path: "login", component: LoginComponent},
    {path: "menu", component: MenuComponent},
    {path: "paquetes", component: PaquetesComponent},
    {path: "recuérarpassword", component: RecuperarpasswordComponent},
    {path: "rutas", component: RutasComponent},
    {path: "transportes", component: TransportesComponent},
    {path: "transportistas", component: TransportistasComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
