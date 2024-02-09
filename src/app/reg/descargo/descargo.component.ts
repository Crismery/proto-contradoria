import { Component, ViewChild, OnInit, Input, Type } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../../_services/http-provider.service';
import { DescargoEquiposParcialComponent } from './descargo-equipos-parcial.component';


@Component({
  selector: 'app-descargo',
  templateUrl: './descargo.component.html',
  styleUrl: './descargo.component.css'
})
export class DescargoComponent implements OnInit {
  displayedColumns: string[] = [
    'Dispositivo',
    'Modelo',
    'Serial',
    'Nombre_Equipo',
    'OS',
    'CPU',
    'Memory',
    'Storage',
    'Size',
    'Departamento'
  ];
  
  d = " ";



  dataSource!: MatTableDataSource <any>; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private dialog: MatDialog, private  testsService: HttpProviderService) {}
  
  
  ngOnInit(): void {
    this.getList();
  
}


  addDialog(): void {
    const dialogRef = this.dialog.open(DescargoEquiposParcialComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getList();
        }
      }
    });
  }

  getList() {
    this.testsService.getAllWhereU().subscribe({
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
    this.count(this.dataSource.filteredData.length);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  count(da:any){
    this.d = da;
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
