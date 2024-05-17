import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Imaterial } from '../model/imaterial';
import { MaterialService } from '../service/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  constructor(private service:MaterialService,private router:Router){}
  subbmited=false;
  onSubmit(f:NgForm){
    this.subbmited=true;
    
      if(f.invalid){
        return
      }
      else{
  this.addMaterial(f)
  }
  }
  addMaterial=(f:NgForm)=>{
   const newArr={ libelle:f.value.libelle,reserve:false,quantite:f.value.quantite}
   this.service.addMaterial(newArr as Imaterial).subscribe(
    response => {
   
      console.log('Material added successfully:', response);
    },
    error => {
     
      console.error('Error adding material:', error);
    }
   );
   this.router.navigate(["/material"]);
  }
}
