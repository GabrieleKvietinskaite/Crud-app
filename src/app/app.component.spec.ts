import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CarNumberPlatesListComponent } from './components/car-number-plates-list/car-number-plates-list.component';
import { CreateCarNumberPlateDialogComponent } from './components/create-car-number-plate-dialog/create-car-number-plate-dialog.component';
import { UpdateCarNumberPlateDialogComponent } from './components/update-car-number-plate-dialog/update-car-number-plate-dialog.component';
import { DeleteCarNumberPlateDialogComponent } from './components/delete-car-number-plate-dialog/delete-car-number-plate-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSortModule } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [
        AppComponent,
        CarNumberPlatesListComponent,
        CreateCarNumberPlateDialogComponent,
        UpdateCarNumberPlateDialogComponent,
        DeleteCarNumberPlateDialogComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crud-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('crud-app');
  });
});
