import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpProviderService } from '../../_services/http-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../reporte/view.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {
  rForm: FormGroup;


  constructor(private dialog: MatDialog, private rService: HttpProviderService, private formBuilder: FormBuilder) {
    this.rForm = this.formBuilder.group({
      DepartamentoL: false,
      DispositivoL: false,
      ModeloL: false,
      Departamento: [''],
      Dispositivo: [''],
      Modelo: [''],
    });
  }

  ngOnInit(): void {

  }


  onSubmit(event: any) {
    let data1 = this.rForm.value;
    switch (event) {
      case 'D': {
        this.rService.findByD(data1.Departamento).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };

      case 'Dis': {
        this.rService.findByDis(data1.Dispositivo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };
      case 'Mod': {
        this.rService.findByM(data1.Modelo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };
      case 'DDis': {
        this.rService.findByDDis(data1.Departamento, data1.Dispositivo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };
      case 'DMod': {
        this.rService.findByDMod(data1.Departamento, data1.Modelo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };
      case 'DisMod':  {
        this.rService.findByDisMod(data1.Dispositivo, data1.Modelo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };
      case 'DDisMod': {
        this.rService.findByDDisMod(data1.Departamento, data1.Dispositivo, data1.Modelo).subscribe({
          next: (res) => {

            const dialogRef = this.dialog.open(ViewComponent, { data: res });
            dialogRef.afterClosed().subscribe({
              next: (val) => {

              }
            });
          }

          });
            break;
          
      };

    }

  }
}
