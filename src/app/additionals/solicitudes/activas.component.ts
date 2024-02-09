import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../../_services/http-provider.service';
import * as XLSX from 'xlsx-js-style';
import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-activas',
  templateUrl: './activas.component.html',
  styleUrl: './activas.component.css'
})
export class ActivasComponent {

  

  displayedColumns: string[] = [
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

  date=new Date();
  
  pipe = new DatePipe('en-US');
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService) {
  }


  ngOnInit(): void {
      this.getList();
      
  }

  getList() {
    this.testsService.getAllWhereNOBN().subscribe ({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);   
      }
    })
    
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
