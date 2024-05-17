import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IEvent } from '../model/ievent';
const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class EventService {
  headers= this.service.createAuhtorizationHeader()

  constructor(private http:HttpClient,private service:AuthService) { }
  getAllEvents():Observable<IEvent[]>{
    return this.http.get<IEvent[]>(BASE_URL+'api/event',{headers:this.headers!});
  }
  addEvent(nvEvent:IEvent):Observable<IEvent>{
    return this.http.post<IEvent>(BASE_URL+'api/event/'+localStorage.getItem("username"),nvEvent,{headers:this.headers!});
  }
  deleteEvent(id:number):Observable<string>{
    return this.http.delete(BASE_URL+'api/event/'+id,{headers:this.headers!, responseType: 'text'});
  }
  events:IEvent[]
  getEventById(id:number){
    return this.getAllEvents().pipe(
      map(events=>{
        this.events=events;
        return this.events.find(e=>e.id==id)||null;
      })
    )
  }
  editEvent(e:IEvent,idEvent:number){
    return this.http.put(BASE_URL+"api/event/"+idEvent,e,{headers:this.headers!})
  }
}
