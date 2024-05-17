import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { map } from 'rxjs';
import { IreservationSalle } from '../model/ireservation-salle';
const BASE_URL = ["http://localhost:8080/"];
@Injectable({
  providedIn: 'root'
})
export class ReservationSalleServiceService {

  IreservationSalle!:IreservationSalle[];
  headers= this.service.createAuhtorizationHeader()
  
  constructor(private http:HttpClient,private service:AuthService) { }

  getAllRessS():Observable<IreservationSalle[]>{
    return this.http.get<IreservationSalle[]>(BASE_URL+'api/reservation/salle',{headers:this.headers!});
  }
  getAllRessSAttente():Observable<IreservationSalle[]>{
    return this.http.get<IreservationSalle[]>(BASE_URL+'api/reservationAttente/salle',{headers:this.headers!});
  }
addRessS(a:IreservationSalle,id : number):Observable<IreservationSalle> {
    return this.http.post<IreservationSalle>(BASE_URL + "api/reservation/salle/" + id,a,{headers:this.headers!});
  }

updateRessS(a:IreservationSalle , id : number):Observable<IreservationSalle> {
    return this.http.put<IreservationSalle>(BASE_URL + "api/reservation/salle/"+ a.id + id,a,{headers:this.headers!});
  }

  updateEtatRessS(id : number,etatId:number):Observable<IreservationSalle> {
    return this.http.put<IreservationSalle>(BASE_URL + "api/reservation/"+etatId+"/salle/"+ id,{headers:this.headers!});
  }
  deleteRess(id: number): Observable<string> {
    return this.http.delete(BASE_URL + 'api/reservation/salle/' + id, { headers: this.headers!, responseType: 'text' });
  }
  getRessSlById(id:number):Observable<IreservationSalle|null>{
    return this.getAllRessS().pipe(
      map(IreservationSalle=>{
        this.IreservationSalle=IreservationSalle;
        return this.IreservationSalle.find(x => x.id == id)||null;
      })
    );
  }


}
