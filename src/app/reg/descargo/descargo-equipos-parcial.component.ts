import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../../_services/http-provider.service';
import { TestService } from '../../_services/test.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-descargo-equipos-parcial',
  templateUrl: './descargo-equipos-parcial.component.html',
  styleUrl: './descargo-equipos-parcial.component.css'
})
export class DescargoEquiposParcialComponent implements OnInit{

  selectedD:string[] =[];

  displayedColumns: string[] = [
    'Check',
    'Dispositivo',
    'Modelo',
    'Serial',
    'Placa',
    'BN',
    'Departamento',
  ];
  
  dataSource!: MatTableDataSource <any>; 
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService, @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
      this.getList();
  }

  

  selectedDis(Serial: string, ob: MatCheckboxChange) {
    let i = this.selectedD.length;
    if(ob.checked) {
      this.selectedD.push(Serial);
    } else {
      var index = this.selectedD.indexOf(Serial);
      if (index !== -1)
      this.selectedD.splice(index, 1);
    }
    console.log(this.selectedD);
    
  }


  updateDA() {
    let i = 0;
    let confirm = window.confirm("Estas seguro que deseas descargar estos dispositivos a almacen")
    if(confirm) {
      while (i<this.selectedD.length) {
      this.testsService.updateDA(this.selectedD[i], "").subscribe({
        next: (res) => {
          alert("Se han descargado uno o varios dispositivos al almacen");
          this.testsService.updateBySerial(this.selectedD[i],"");
          this.getList();
          
        },
        error: (err) => {
          console.log(err);
        },
      });
      var index = this.selectedD.indexOf(this.selectedD[i]);
      if (index !== -1)
      this.selectedD.splice(index, 1);
    }
  }
  }

  updateDD() {
    let i = 0;
    let confirm = window.confirm("Estas seguro que deseas descargar estos dispositivos en el mismo departamento")
    if(confirm) {
      while (i<this.selectedD.length) {
      this.testsService.updateDD(this.selectedD[i], "").subscribe({
        next: (res) => {
          alert("Se han descargado uno o varios dispositivos al mismo departamento donde estaban");
          this.testsService.updateBySerial(this.selectedD[i],"");
          this.getList();
          
        },
        error: (err) => {
          console.log(err);
        },
      });
      var index = this.selectedD.indexOf(this.selectedD[i]);
      if (index !== -1)
      this.selectedD.splice(index, 1);
    }
  }
  }

  getList() {
    this.testsService.getAllWhereUO().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteR(Serial: string) {
    let confirm = window.confirm("Estas seguro que deseas borrar este registro")
    if(confirm) {
      this.testsService.delete(Serial).subscribe({
        next: (res) => {
          alert("Se elimino el registro");
          this.getList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }




}
