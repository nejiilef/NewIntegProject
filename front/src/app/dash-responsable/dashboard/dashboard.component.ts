import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from '../../pages/dashboards/default/data';
import { ChartType } from '../model/chart-type';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../core/services/event.service';
import { EventService as ev } from '../../event/service/event.service';

import { ConfigService } from '../../core/services/config.service';
import { IEvent } from 'ngx-lightbox';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { IEvent as AppEvent } from '../../event/model/ievent';
import { Router } from '@angular/router';
import { ReservationSalleServiceService } from 'src/app/reservation-salle/service/reservation-salle-service.service';
import { IreservationSalle } from 'src/app/reservation-salle/model/ireservation-salle';
import { MaterialService } from 'src/app/material/service/material.service';
import { Imaterial } from 'src/app/material/model/imaterial';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  modalRef?: BsModalRef;
  isVisible: string;
nb:number;
nb2:number;
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
  idMateriel: number;
  constructor(private serviceMateriel:MaterialService ,private modalService: BsModalService, private configService: ConfigService, private eventService: EventService,private evenmentsService:ev,private router:Router,private fb:FormBuilder,private reservationSalleService:ReservationSalleServiceService) {
  }
  events!:IEvent[];
  updateMaterielForm:any;
  reservation!:IreservationSalle[];
  materials!:Imaterial[];
  res!:number;
  ngOnInit() {
    this.reservationSalleService.getAllRessSAttente().subscribe((r)=>{this.reservation=r;
      console.log(r);
    console.log(r.length);
  
this.res=this.reservation[1].jour.getMonth();}
    );
    this.serviceMateriel.getAllMaterials().subscribe((m)=>this.materials=m);
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
    this.updateMaterielForm=this.fb.group({
     
      libelle:['',Validators.required],
      quantite:['',Validators.required]
    })
  }
  deleteMaterial(id:number){
    this.serviceMateriel.deleteMaterial(id).subscribe((response)=>{
      this.router.navigate(['user/material']);
      this.ngOnInit();
    })
  }
  updatEtatResSalle(id:number,etatId:number){
    this.reservationSalleService.updateEtatRessS(id,etatId).subscribe((response)=>{
      this.ngOnInit();
    })
  }
  updating:boolean;
  idEvent:number;
OnSubmitUpdate(id:number){
  this.updating=true;
  console.log(this.updating);
this.idMateriel=id;
this.getMaterielById();
console.log(this.getMaterielById())
}
updateMateriel(){
  this.serviceMateriel.updateMaterial(this.updateMaterielForm.value,this.idMateriel).subscribe((response)=>{
    this.ngOnInit();
  })
}
  getMaterielById(){
    this.serviceMateriel.getMaterialById(this.idMateriel).subscribe((response)=>{
      this.updateMaterielForm.patchValue(response);
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
    console.log(f.value);
      if(f.invalid){
        console.log("kkk")
        return
      }
      else{
  this.addMaterial(f)
}
  }

  deleteEvent(id:number){
    console.log(id);
    this.evenmentsService.deleteEvent(id).subscribe((response)=>{
      this.ngOnInit();
    })
    

  }


  addMaterial=(f:NgForm)=>{
    const newArr={ libelle:f.value.libelle,reserve:false,quantite:f.value.quantite}
    this.serviceMateriel.addMaterial(newArr as Imaterial).subscribe(
     response => {
    
       console.log('Material added successfully:', response);
     },
     error => {
       console.error('Error adding material:', error);
     }
    );
    this.router.navigate(["/material"]);
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
  this.reservationSalleService.getAllRessSAttente().subscribe((res)=>{

 this.nb2=res.length;
    this.serviceMateriel.getAllMaterials().subscribe((r)=>{
      this.nb=r.length;
      this.statData=[{
        "icon": "mdi mdi-wallet-membership",
        "title": "Demandes de reservations des salles",
        "value": this.nb2
      }, {
        "icon": "mdi mdi-calendar",
        "title": "Nombre des materiels",
        "value": this.nb
      }];}
     );
    });
    
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




calculNombreReservationParMois(){
  
      this.reservation.forEach(element => {
       if( element.jour.getMonth() == 1){

       }
        });
       

}







  
}
