import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './principal/menu/menu.component';

const routes: Routes = [
  {path: '',redirectTo: '/menu', pathMatch:'full'},
  {path:'menu',component:MenuComponent},
  {path: "principal", 
  loadChildren: () => import('./principal/principal.module').then(mod => mod.PrincipalModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
