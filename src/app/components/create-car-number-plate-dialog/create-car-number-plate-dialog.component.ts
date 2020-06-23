import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IPlate } from 'src/app/Models/plate';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-car-number-plate-dialog',
  templateUrl: './create-car-number-plate-dialog.component.html',
  styleUrls: ['./create-car-number-plate-dialog.component.css']
})
export class CreateCarNumberPlateDialogComponent implements OnInit {
  createRecordForm: FormGroup;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<CreateCarNumberPlateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit() {
      this.createRecordForm = new FormGroup({
        carNumberPlate: new FormControl('', [
          Validators.required, Validators.minLength(6), Validators.maxLength(6)
        ]),
        firstName: new FormControl('', [
          Validators.required, Validators.minLength(2), Validators.maxLength(20)
        ]),
        lastName: new FormControl('', [
          Validators.required, Validators.minLength(2), Validators.maxLength(24)
        ]),
      });
  }

  close() {
      this.dialogRef.close();
  }

  get f() {
      return this.createRecordForm.controls;
  }

  submit(){
      if(this.createRecordForm.invalid) {
          return;
      }

      const record: IPlate = {
          Id: null,
          NumberPlate: this.f.carNumberPlate.value,
          FirstName: this.f.firstName.value,
          LastName: this.f.lastName.value,
      }

      this.dialogRef.close(record);
  }

}
