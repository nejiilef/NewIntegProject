import { Component } from '@angular/core';
import { ReservationSalleServiceService } from '../service/reservation-salle-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IreservationSalle } from '../model/ireservation-salle';

@Component({
  selector: 'app-res-salle',
  templateUrl: './res-salle.component.html',
  styleUrls: [
    
  
  ]
})
export class ResSalleComponent {
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


  constructor(private service:ReservationSalleServiceService,private router:Router){}
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
   this.router.navigate(["/ressSalle"]);
  }

  


}
