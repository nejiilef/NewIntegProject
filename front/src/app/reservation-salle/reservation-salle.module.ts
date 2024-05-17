import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationSalleRoutingModule } from './reservation-salle-routing.module';
import { ResSalleComponent } from './res-salle/res-salle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListReservationSalleComponent } from './list-reservation-salle/list-reservation-salle.component';


@NgModule({
  declarations: [
    ResSalleComponent,
    ListReservationSalleComponent
  ],
  imports: [
    CommonModule,
    ReservationSalleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReservationSalleModule { }
