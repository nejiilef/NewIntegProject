import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgApexchartsModule } from 'ng-apexcharts';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from '../pages/dashboards/default/default.component';
import { SaasComponent } from '../pages/dashboards/saas/saas.component';
import { CryptoComponent } from '../pages/dashboards/crypto/crypto.component';
import { BlogComponent } from '../pages/dashboards/blog/blog.component';
import { JobsComponent } from '../pages/dashboards/jobs/jobs.component';
import { UIModule } from '../shared/ui/ui.module';
import { DashboardsRoutingModule } from '../pages/dashboards/dashboards-routing.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { DashResponsableRoutingModule } from './dash-responsable-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UIModule,
    FormsModule,
    
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
    ModalModule.forRoot(),
    DashResponsableRoutingModule
  ],
  providers: [BsDropdownConfig],
})
export class DashResponsableModule { }
