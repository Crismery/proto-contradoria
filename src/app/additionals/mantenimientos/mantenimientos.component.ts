import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MantenimientoService } from '../../_services/mantenimiento.service';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrl: './mantenimientos.component.css'
})
export class MantenimientosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'Serial',
    'TipoM',
    'Actualizacion',
    'Descripcion',
    'Defrag',
    'Memoria',
    'Almacenamiento',
    'Cleaning',
    'Fecha'
  ];
  
  dataSource!: MatTableDataSource <any>; 
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  
  constructor(private dialog: MatDialog, private  mService: MantenimientoService) {}

  ngOnInit(): void {
      this.getList();
  }





  getList() {
    
    this.mService.get().subscribe({
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

  
}
