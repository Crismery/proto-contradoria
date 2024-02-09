import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../../_services/http-provider.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MantenimientoSHComponent } from './mantenimiento-sh.component';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.css'
})
export class MantenimientoComponent implements OnInit{

  selectedD: any[] = [];

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

  
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService) {}

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

  Mant() {
    const dialogRef = this.dialog.open(MantenimientoSHComponent, {data: this.selectedD});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        
          this.getList();
          this.selectedD =[];
        
      }
    });
  }

 

  getList() {
    this.testsService.getAllWhereNOBN().subscribe({
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
