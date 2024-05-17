import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../../core/services/event.service';
import { EventService as ev } from '../../../event/service/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { IEvent } from 'ngx-lightbox';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { IEvent as AppEvent } from '../../../event/model/ievent';
import { Router } from '@angular/router';
import { ReservationSalleServiceService } from 'src/app/reservation-salle/service/reservation-salle-service.service';
import { number } from 'echarts';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  modalRef?: BsModalRef;
  isVisible: string;
nb:number;
  ;
  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: any;
  statData:any;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  isActive: string;

  @ViewChild('content') content;
  @ViewChild('center', { static: false }) center?: ModalDirective;
  constructor(private modalService: BsModalService, private configService: ConfigService, private eventService: EventService,private evenmentsService:ev,private router:Router,private fb:FormBuilder,private reservationSalleService:ReservationSalleServiceService) {
  }
  events!:IEvent[];
  updateEventForm:any;
  ngOnInit() {
   
    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute('data-layout');

    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
      }
    }

    /**
     * Fetches the data
     */
    this.fetchData();


    this.evenmentsService.getAllEvents().subscribe(events=>{
      this.events=events;
    })
    this.updateEventForm=this.fb.group({
      libelle:['',Validators.required],
      description:['',Validators.required]
    })
  }
  updating:boolean;
  idEvent:number;
OnSubmitUpdate(id:number){
  this.updating=true;
  console.log(this.updating);
this.idEvent=id;
this.getEventById();

}
updateEvent(){
  this.evenmentsService.editEvent(this.updateEventForm.value,this.idEvent).subscribe((response)=>{
    this.ngOnInit();
  })
}
  getEventById(){
    this.evenmentsService.getEventById(this.idEvent).subscribe((response)=>{
      this.updateEventForm.patchValue(response);
    })
  }
  addEvent(f:NgForm){
    const newEvent={
      id:null,
      libelle:f.value.Libelle,
      description:f.value.description
    }
    this.evenmentsService.addEvent(newEvent as AppEvent).subscribe(
      response=>{
        console.log('Event added successfully:', response);
        this.ngOnInit();
      },
      error => {
       
        console.error('Error adding Event:', error);
      }
    );
    
    this.router.navigate(["/dash"]);
    
  }
  subbmited=false;
  onSubmit(f:NgForm){
    this.subbmited=true;
      if(f.invalid){
        return
      }
      else{
  this.addEvent(f)
  }
  }
  deleteEvent(id:number){
    console.log(id);
    this.evenmentsService.deleteEvent(id).subscribe((response)=>{
      this.ngOnInit();
    })
    
  }
  ngAfterViewInit() {
    setTimeout(() => {
     this.center?.show()
    }, 2000);
  }

  /**
   * Fetches the data
   */
  private fetchData() {
  
    this.evenmentsService.getAllEvents().subscribe((r)=>{
      this.nb=r.length;
      this.statData=[{
        "icon": "mdi mdi-wallet-membership",
        "title": "Members",
        "value": 9
      }, {
        "icon": "mdi mdi-calendar",
        "title": "Events",
        "value": this.nb
      }];}
     );
    
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData[2].value=this.nb;
    });
  }
  opencenterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
}
