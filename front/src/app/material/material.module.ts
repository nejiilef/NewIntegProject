import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { ListMaterialComponent } from './list-material/list-material.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    ListMaterialComponent,
    AddMaterialComponent,
    EditMaterialComponent
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule
  ]
})
export class MaterialModule { }
