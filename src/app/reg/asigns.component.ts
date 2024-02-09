import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestService } from '../_services/test.service';


@Component({
  selector: 'app-asigns',
  templateUrl: './asigns.component.html',
  styleUrl: './asigns.component.css'
})
export class AsignsComponent implements OnInit{
  rForm: FormGroup;

  
  constructor (private rService: TestService, private dialogRef: MatDialogRef<AsignsComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.rForm = this.formBuilder.group({
      ID_Usuario: ['', Validators.required],
      Usuario: ['', Validators.required],
      Departamento: ['', Validators.required],

    });
  }

  ngOnInit(): void {
      this.rForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.rForm.valid) {
      if (this.data) {
      this.rService.updateByID(this.data.ID_Usuario, this.rForm.value)
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
