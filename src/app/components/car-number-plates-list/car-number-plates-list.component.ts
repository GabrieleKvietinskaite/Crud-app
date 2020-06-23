import { Component, OnInit, ViewChild } from '@angular/core';
import { PlateService } from 'src/app/Services/plate.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig, MatSort, MatSnackBar } from '@angular/material';
import { IPlate } from 'src/app/Models/plate';
import { CreateCarNumberPlateDialogComponent } from '../create-car-number-plate-dialog/create-car-number-plate-dialog.component';
import { UpdateCarNumberPlateDialogComponent } from '../update-car-number-plate-dialog/update-car-number-plate-dialog.component';
import { DeleteCarNumberPlateDialogComponent } from '../delete-car-number-plate-dialog/delete-car-number-plate-dialog.component';

@Component({
  selector: 'app-car-number-plates-list',
  templateUrl: './car-number-plates-list.component.html',
  styleUrls: ['./car-number-plates-list.component.css']
})
export class CarNumberPlatesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'carNumberPlate', 'firstName', 'lastName', 'actions'];
  dataSource;
  plates: IPlate[];
  error: string;

  constructor(private carNumberPlateService: PlateService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    var service = this.carNumberPlateService.getPlates();

    service.subscribe(
      plates => {
        this.plates = plates;
        this.dataSource = new MatTableDataSource<IPlate>(this.plates);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.error = <any>error
    )
  }

  create() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(CreateCarNumberPlateDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(
			data => {
				if (data != null) {
					this.carNumberPlateService.createRecord(data).subscribe(
						data => {},
            error => {
              this.snackBar.open(error, null, {duration: 3000});
            }
					);
				}
      },
      err => {},
      () => this.loadData()
		);
  }
  
  update(plate: IPlate) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      plate: plate
    };

    const dialogRef = this.dialog.open(UpdateCarNumberPlateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.carNumberPlateService.updatePlate(data).subscribe(
            newPlate => {},
            error => {
              this.snackBar.open(error, null, {duration: 3000});
            }
          );
        }
      },
      err => {},
      () => this.loadData()
    );
  }

  delete(userId: number, index: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      
    const dialogRef = this.dialog.open(DeleteCarNumberPlateDialogComponent, dialogConfig);
      
    dialogRef.afterClosed().subscribe(
      data => {
        if (data == true) {
          this.carNumberPlateService.deletePlate(userId).subscribe(
            plate => {},
            error => {
              this.snackBar.open(error, null, {duration: 3000});
            }
          );
        }
      },
      err => {},
      () => this.loadData()
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}