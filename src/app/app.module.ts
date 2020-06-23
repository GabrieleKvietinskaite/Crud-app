import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarNumberPlatesListComponent } from './components/car-number-plates-list/car-number-plates-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCarNumberPlateDialogComponent } from './components/create-car-number-plate-dialog/create-car-number-plate-dialog.component';
import { UpdateCarNumberPlateDialogComponent } from './components/update-car-number-plate-dialog/update-car-number-plate-dialog.component';
import { DeleteCarNumberPlateDialogComponent } from './components/delete-car-number-plate-dialog/delete-car-number-plate-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatSnackBarModule } from '@angular/material';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CarNumberPlatesListComponent,
    CreateCarNumberPlateDialogComponent,
    UpdateCarNumberPlateDialogComponent,
    DeleteCarNumberPlateDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSortModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateCarNumberPlateDialogComponent, UpdateCarNumberPlateDialogComponent, DeleteCarNumberPlateDialogComponent]
})
export class AppModule { }
