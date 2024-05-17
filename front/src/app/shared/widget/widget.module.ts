import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { StatComponent } from './stat/stat.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent }
  // Define your other routes here
];
@NgModule({
 
  
  declarations: [StatComponent, TransactionComponent],
  imports: [
    
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  exports: [StatComponent, TransactionComponent]
})
export class WidgetModule { }
