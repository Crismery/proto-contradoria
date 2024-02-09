import { Component, OnInit, Type, Input, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../_services/http-provider.service';
import { TestService } from '../_services/test.service';
import { AsignsComponent } from './asigns.component';
import { AsigningComponent } from './asigning.component';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrl: './asign.component.css'
})
export class AsignComponent implements OnInit {
  displayedColumns: string[] = [
    'ID_Usuario',
    'Usuario',
    'Departamento',
    'Accion'
  ];
  



  dataSource!: MatTableDataSource <any>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private dialog: MatDialog, private  testsService: TestService) {}
  
  
  ngOnInit(): void {
    this.getList();
}


  addDialog(): void {
    const dialogRef = this.dialog.open(AsignsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getList();
        }
      }
    });
  }

  getList() {
    this.testsService.getAll().subscribe({
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


  deleteR(ID_Usuario: string) {
    let confirm = window.confirm("Estas seguro que deseas borrar este registro")
    if(confirm) {
      this.testsService.delete(ID_Usuario).subscribe({
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
    const dialogRef = this.dialog.open(AsignsComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {

          this.getList();
        
      }
    });
  }

  openAsign(data: any){
    const dialogRef = this.dialog.open(AsigningComponent, {data});
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList;
      }
    });

  };


}


