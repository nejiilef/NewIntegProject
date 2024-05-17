import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMaterialComponent } from './list-material/list-material.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { guardGuard } from '../auth/guard/guard.guard';

const routes: Routes = [
  { path : '' , component:ListMaterialComponent,canActivate:[guardGuard]},
  { path : 'add',component:AddMaterialComponent,canActivate:[guardGuard]},
  { path : 'edit/:id',component:EditMaterialComponent,canActivate:[guardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {
  

 }
