import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { WidgetModule } from './widget/widget.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [], // Add shared components, directives, or pipes if needed
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    UIModule,
    WidgetModule,
    ReactiveFormsModule,
    // Export any shared components, directives, or pipes if needed
  ],
})
export class SharedModule { }
