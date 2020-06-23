import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IPlate } from 'src/app/Models/plate';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-car-number-plate-dialog',
  templateUrl: './update-car-number-plate-dialog.component.html',
  styleUrls: ['./update-car-number-plate-dialog.component.css']
})
export class UpdateCarNumberPlateDialogComponent implements OnInit {
  updatePlateForm: FormGroup;
  error = '';
  plate: IPlate;

  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<UpdateCarNumberPlateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      
        this.plate = Object.assign({}, data.plate);
  }

  ngOnInit() {
      this.updatePlateForm = new FormGroup({
      carNumberPlate: new FormControl(this.plate.NumberPlate, [
        Validators.required, Validators.minLength(6), Validators.maxLength(6)
      ]),
      firstName: new FormControl(this.plate.FirstName, [
        Validators.required, Validators.minLength(2), Validators.maxLength(20)
      ]),
      lastName: new FormControl(this.plate.LastName, [
        Validators.required, Validators.minLength(2), Validators.maxLength(24)
      ]),
    });
  }

  close() {
      this.dialogRef.close();
  }

  get f() {
      return this.updatePlateForm.controls;
  }

  submit(){
    if(this.updatePlateForm.invalid) {
        return;
    }

    const updatedPlate: IPlate = {
      Id: this.plate.Id,
      NumberPlate: this.f.carNumberPlate.value,
      FirstName: this.f.firstName.value,
      LastName: this.f.lastName.value,
    }
    
    this.dialogRef.close(updatedPlate);
  }
}
