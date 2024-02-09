import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpProviderService } from '../_services/http-provider.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  rForm: FormGroup;


  constructor (private rService: HttpProviderService, private dialogRef: MatDialogRef<EditComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.rForm = this.formBuilder.group({
      Dispositivo: ['', Validators.required],
      Modelo: ['', Validators.required],
      Serial: [''],
      Placa: [''],
      BN: [''],
      Size: [''],
      OS: [''],
      CPU: [''],
      Memory: [''],
      Storage: [''],
      Departamento: ['Almacen'],
    });
  }

  ngOnInit(): void {
      this.rForm.patchValue(this.data);
  }


  onSubmit() {
    if (this.rForm.valid) {
      if (this.data) {
      this.rService.updateBySerial(this.data.Serial, this.rForm.value)
      .subscribe({
        next: (val:any) => {
          alert('Se han actualizado los datos del registro.');
          this.dialogRef.close(true);
        }, error: 
      (err:any) => {
        console.error(err);
        alert("Error al actualizar registro.");
      },
    });
  } else { 
           this.rService.create(this.rForm.value).subscribe({
            next: (val: any) => {
            alert("Se ha adherido un nuevo registro");
            this.rForm.patchValue({
              Placa: '',
              BN: '',
              Serial: ''
            })
            //this.rForm.reset();
            //this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Hubo un error al intentar crear el registro");
          },
        });
      }
  } 
}


}
