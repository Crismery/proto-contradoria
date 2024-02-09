import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, RegisterComponent, ProfileComponent } from './account/index';
import { DashboardComponent, BoardAdminComponent, BoardUserComponent } from './dashboard/index';

import { HttpInterceptorProviders } from './_helpers/http.interceptor';
import { HomeComponent } from './dashboard/home.component';
import { RegComponent, AddComponent, EditComponent,EntradaComponent } from './reg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsignComponent } from './reg/asign.component';
import { AsignsComponent } from './reg/asigns.component';
import { AsigningComponent } from './reg/asigning.component';
import { StorageComponent } from './reg/storage/storage.component';
import { DescargoComponent } from './reg/descargo/descargo.component';
import { DescargoEquiposComponent } from './reg/descargo/descargo-equipos.component';
import { DescargoEquiposParcialComponent } from './reg/descargo/descargo-equipos-parcial.component';
import { DescargoEquiposBnComponent } from './reg/descargo/descargo-equipos-bn.component';
import { MantenimientoComponent } from './reg/mantenimiento/mantenimiento.component';
import { MantenimientoSHComponent } from './reg/mantenimiento/mantenimiento-sh.component';
import { ReporteComponent } from './reg/reporte/reporte.component';
import { ViewComponent } from './reg/reporte/view.component';

import * as XLSX from 'xlsx';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { MantenimientosComponent } from './additionals/mantenimientos/mantenimientos.component';
import { SolicitudesComponent } from './additionals/solicitudes/solicitudes.component';
import { ActivasComponent } from './additionals/solicitudes/activas.component';
import { DisponiblesComponent } from './additionals/solicitudes/disponibles.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    HomeComponent,
    RegComponent,
    AddComponent,
    EditComponent,
    EntradaComponent,
    AsignComponent,
    AsignsComponent,
    AsigningComponent,
    StorageComponent,
    DescargoComponent,
    DescargoEquiposComponent,
    DescargoEquiposParcialComponent,
    DescargoEquiposBnComponent,
    MantenimientoComponent,
    MantenimientoSHComponent,
    ReporteComponent,
    ViewComponent,
    MantenimientosComponent,
    SolicitudesComponent,
    ActivasComponent,
    DisponiblesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,

  ],
  providers: [
    HttpInterceptorProviders,
    {provide: DATE_PIPE_DEFAULT_OPTIONS,
    useValue: { dateFormat: "shortDate"}},
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
