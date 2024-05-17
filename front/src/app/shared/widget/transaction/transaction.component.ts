import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IreservationSalle } from 'src/app/reservation-salle/model/ireservation-salle';
import { ReservationSalleServiceService } from 'src/app/reservation-salle/service/reservation-salle-service.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  // modalRef?: BsModalRef;

  // @Input() transactions: Array<{
  //   id?: number;
  //   heure_debut?: Date,
  //   heure_fin?: Date,
  //   jour?: Date
  // }>;

  // constructor(private modalService: BsModalService) { }

  // ngOnInit() {
  // }

  // /**
  //  * Open modal
  //  * @param content modal content
  //  */
  // openModal(content: any) {
  //   this.modalRef = this.modalService.show(content);
  // }
  nb:number;
  reservation!:IreservationSalle[];
constructor(private service:ReservationSalleServiceService,private router:Router){}
  ngOnInit(): void {
    this.service.getAllRessS().subscribe((r)=>{this.reservation=r;
    console.log(r);
  console.log(r.length);}
  );
  }

  deleteReservation(id:number){
    this.service.deleteRess(id).subscribe((response)=>{
      this.router.navigate(['/dash']);
      this.ngOnInit();
    })
  }

  time1: string | undefined;
  time2: string | undefined;

  validateTimes(f:NgForm) {
    this.time1 =f.value.heureDebut;
    this.time2=f.value.heureFin;
      console.log('Time 1:', this.time1);
      console.log('Time 2:', this.time2);
      
    
    if (this.time1 && this.time2 && this.time1 > this.time2) {
      // Reset the value of time2 if it's less than or equal to time1
      this.time2 = undefined
      alert('in Appropriate time');
    }
    else{
      console.log("submit")
      this.onSubmit(f);
    }
  }
  


  updateTime2(event: any) {
    
    this.time2 = event.target.value;
  }

  updateTime1(event: any) {
    this.time1 = event.target.value;
  }


   subbmited=false;
  onSubmit(f:NgForm){
    this.subbmited=true;
      if(f.invalid){
        return
      }
      else{
  this.addRessS(f)
  }
  }

  salle= [{
    id: 1,
    libelle: 'Salle 1',
    reserve: false,
    department: "electrique"
  },
  {
    id: 2,
    libelle: 'Salle 2',
    reserve: false,
    department: "informatique"
  }
  ,
  {
    id: 3,
    libelle: 'Salle 3',
    reserve: false,
    department: "informatique"
  },
  {
    id: 4,
    libelle: 'Salle 4',
    reserve: false,
    department: "Gestion"
  }
]

selectedSalle : any;


addRessS=(f:NgForm)=>{
   const newArr={id : f.value.id , heureDebut:f.value.heureDebut,heureFin: f.value.heureFin , jour:f.value.jour}
   this.service.addRessS(newArr as IreservationSalle , this.selectedSalle.id).subscribe(
    response => {
   
      console.log('reservation added successfully:', response);
    },
    error => {
     alert("Salle deja reserve pendant cette periode !");
      console.error('Error adding reservation:', error);
    }
   );
   this.router.navigate(["/dash"]);
  }

  


}
