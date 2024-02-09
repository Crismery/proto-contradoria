import { Component, ViewChild, OnInit, Input, Type } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../_services/http-provider.service';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent implements OnInit{
  displayedColumns: string[] = [
    'Dispositivo',
    'Modelo',
    'Serial',
    'Placa',
    'BN',
    'Accion'
  ];
  



  dataSource!: MatTableDataSource <any>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService) {}
  
  
  ngOnInit(): void {
    this.getList();
}


  addDialog(): void {
    const dialogRef = this.dialog.open(EditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getList();
        }
      }
    });
  }

  getList() {
    this.testsService.getAllWhere().subscribe({
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

  
  openEdit(data : any){
    const dialogRef = this.dialog.open(EditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        
          this.getList();
        
      }
    });
  }


}
