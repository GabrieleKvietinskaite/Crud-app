import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarNumberPlatesListComponent } from './components/car-number-plates-list/car-number-plates-list.component';


const routes: Routes = [
  {
    path: '',
    component: CarNumberPlatesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
