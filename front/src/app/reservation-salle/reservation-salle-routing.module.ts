import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResSalleComponent } from './res-salle/res-salle.component';
import { guardGuard } from '../auth/guard/guard.guard';
import { ListReservationSalleComponent } from './list-reservation-salle/list-reservation-salle.component';
const routes: Routes = [
  { path : 'add' , component:ResSalleComponent},
  { path : '' , component:ListReservationSalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationSalleRoutingModule { }
