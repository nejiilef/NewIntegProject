import { Injectable } from '@angular/core';
import { Imaterial } from '../model/imaterial';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { map } from 'rxjs';
const BASE_URL = ["http://localhost:8080/"];
@Injectable({
  providedIn: 'root'
})

export class MaterialService {
  materials!:Imaterial[];
  headers= this.service.createAuhtorizationHeader()
  
  constructor(private http:HttpClient,private service:AuthService) { }

  getAllMaterials():Observable<Imaterial[]>{
    return this.http.get<Imaterial[]>(BASE_URL+'api/materiel',{headers:this.headers!});
  }

addMaterial(a:Imaterial):Observable<Imaterial> {
    return this.http.post<Imaterial>(BASE_URL + "api/materiel",a,{headers:this.headers!});
  }

updateMaterial(a:Imaterial,id:number):Observable<Imaterial> {
    return this.http.put<Imaterial>(BASE_URL + "api/materiel/" + id,a,{headers:this.headers!});
  }


  deleteMaterial(id: number): Observable<string> {
    return this.http.delete(BASE_URL + 'api/materiel/' + id, { headers: this.headers!, responseType: 'text' });
  }
  getMaterialById(id:number):Observable<Imaterial|null>{
    return this.getAllMaterials().pipe(
      map(materials=>{
        this.materials=materials;
        return this.materials.find(x => x.id == id)||null;
      })
    );
  }

}
