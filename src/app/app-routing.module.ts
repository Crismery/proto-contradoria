import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './account';
import { ProfileComponent } from './account/profile.component';
import { BoardAdminComponent, BoardUserComponent, HomeComponent } from './dashboard';
import { RegComponent, AddComponent, EditComponent, EntradaComponent, AsignComponent} from './reg';
import { StorageComponent } from './reg/storage/storage.component';
import { DescargoComponent, DescargoEquiposComponent } from './reg/descargo';
import { MantenimientoComponent } from './reg/mantenimiento';
import { ReporteComponent } from './reg/reporte/reporte.component';
import { MantenimientosComponent, SolicitudesComponent } from './additionals';



const routes: Routes = [

  {path: 'dashboard', component: DashboardComponent, 
children: [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reg', component: RegComponent},
  {path: 'add', component: RegComponent},
  {path: 'asignacion', component: AsignComponent},
  {path: 'entrada', component: EntradaComponent},
  {path: 'descargo', component: DescargoComponent},
  {path: 'descargo_bn', component: DescargoEquiposComponent},
  {path: 'almacen', component: StorageComponent},
  {path: 'mantenimiento', component: MantenimientoComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: 'mantenimientos', component: MantenimientosComponent},
  {path: 'solicitudes', component: SolicitudesComponent}

]},
  {path: 'login', component: LoginComponent},


  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
