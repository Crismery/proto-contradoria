import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../../_services/http-provider.service';
import { AddComponent } from '../add.component';
import * as XLSX from 'xlsx-js-style';
import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  

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
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService, @Inject(MAT_DIALOG_DATA) public data:any) {
  }


  ngOnInit(): void {
      this.getList();
      
  }

  getList() {
     this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.data);   
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  
  exportarExcel() {
    let dateString = this.pipe.transform(this.date, 'medium');
    const fileName = `Reporte_${dateString}.xlsx`;
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    for (var i in ws) {
      console.log(ws[i]);
      if (typeof ws[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);

      ws[i].s = {
        
        font: {
          name: 'arial',
        },
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1', 
        },
        border: {
          right: {
            style: 'thin',
            color: '000000',
          },
          left: {
            style: 'thin',
            color: '000000',
          },
          top: {
            style: 'thin',
            color: '000000',
          },
          bottom: {
            style: 'thin',
            color: '000000',
          },
        },
      };
      if (cell.c == 6) {
       
        ws[i].s.numFmt = 'DD-MM-YYYY'; 
        ws[i].z = 'DD-MM-YYYY';
      } else {
        ws[i].s.numFmt = '00'; 
      }

      if (cell.r == 0) {
       
        ws[i].s.font.bold = {
          // bottom border
        };
      }

      if (cell.r % 2) {
        
        ws[i].s.fill = {
          
          patternType: 'solid',
          fgColor: { rgb: 'b2b2b2' },
          bgColor: { rgb: 'b2b2b2' },
        };
      }
    }
    
    

    XLSX.utils.book_append_sheet(wb,ws,`Reporte`);

    XLSX.writeFile(wb, fileName);
  }



}

