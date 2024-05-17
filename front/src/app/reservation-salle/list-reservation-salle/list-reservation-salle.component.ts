import { Component, OnInit } from '@angular/core';
import { IreservationSalle } from '../model/ireservation-salle';
import { ReservationSalleServiceService } from '../service/reservation-salle-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-reservation-salle',
  templateUrl: './list-reservation-salle.component.html',
  styleUrls: ['./list-reservation-salle.component.css']
})
export class ListReservationSalleComponent implements OnInit{
reservation!:IreservationSalle[];
constructor(private service:ReservationSalleServiceService,private router:Router){}
  ngOnInit(): void {
    this.service.getAllRessS().subscribe((r)=>this.reservation=r);
  }

  deleteReservation(id:number){
    this.service.deleteRess(id).subscribe((response)=>{
      this.router.navigate(['ressSalle']);
      this.ngOnInit();
    })
  }

}
