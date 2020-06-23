import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-delete-car-number-plate-dialog',
  templateUrl: './delete-car-number-plate-dialog.component.html',
  styleUrls: ['./delete-car-number-plate-dialog.component.css']
})
export class DeleteCarNumberPlateDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteCarNumberPlateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  submit(){
    this.dialogRef.close(true);
  }
}
