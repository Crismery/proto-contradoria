import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpProviderService } from '../_services/http-provider.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  rForm: FormGroup;

  
  constructor (private rService: HttpProviderService, private dialogRef: MatDialogRef<AddComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.rForm = this.formBuilder.group({
      Dispositivo: ['', Validators.required],
      Modelo: ['', Validators.required],
      Serial: ['', Validators.required],
      Placa: ['', Validators.required],
      BN: ['', Validators.required],
      Usuario: ['', Validators.required],
      Departamento: ['', Validators.required],
      Mantenimiento: ['']
    });
  }

  ngOnInit(): void {
      this.rForm.patchValue(this.data);
      alert(this.data.Serial);
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
            this.rForm.reset();
            this.dialogRef.close(true);
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
