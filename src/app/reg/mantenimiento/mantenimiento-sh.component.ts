import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpProviderService } from '../../_services/http-provider.service';
import { MantenimientoService } from '../../_services/mantenimiento.service';


@Component({
  selector: 'app-mantenimiento-sh',
  templateUrl: './mantenimiento-sh.component.html',
  styleUrl: './mantenimiento-sh.component.css'
})
export class MantenimientoSHComponent implements OnInit {
  rForm: FormGroup;
  selectedD: any[] = [];
  isActive: boolean = false;


  constructor( private rService: HttpProviderService, private mService: MantenimientoService, private dialogRef: MatDialogRef<MantenimientoSHComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.rForm = this.formBuilder.group({
      TipoM: ['', Validators.required],
      Memoria: ['No'],
      Memory: [''],
      Almacenamiento: ['No'],
      Storage: [''],
      Type: [''],
      Cleaning: ['No'],
      COS: ['No'],
      Actualizacion: [''],
      Descripcion: [''],
      Desfrag: ['No'],
      ap: false,
      ap2: false
    });
  }
  

  selectedDis() {
    let i = 0;
    while (i < this.data.length) {
      this.selectedD.push(this.data[i]);
      i++;
    }
  }

  test(ap: boolean) {
    var val: string = '';
    if(ap) {
      val= 'Si';
    } else {
      val = 'No';
    }
    return val;
  }



  ngOnInit(): void {
    this.selectedDis();
    
  }


  onSubmit() {
    let i = 0;
    if (this.selectedD.length > 0) {
    while (i < this.data.length) {
      let arr= this.rForm.value;
      arr.Almacenamiento = this.test(arr.ap);
      arr.Memoria = this.test(arr.ap2);
      arr.Serial = this.data[i].Serial;
      this.mService.create(arr).subscribe({
        next: (res) => {
          
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.rService.updateBySerial(this.data[i].Serial, this.rForm.value).subscribe({
        next: (res) => {

        }
      }), 
      
      i++;
      

    }
    alert('Se han creado el mantenimiento de los dispositivos.');
    this.dialogRef.close(true);
  } else {
    
      alert("Hubo un error al intentar crear el mantenimiento.");
      this.dialogRef.close(true);
  

} 

}

}
