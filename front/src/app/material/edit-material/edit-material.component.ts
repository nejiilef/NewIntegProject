import { Component } from '@angular/core';
import { MaterialService } from '../service/material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent {
  updateForm:any;
  id: number = this.activatedRoute.snapshot.params['id'];
  constructor(private service:MaterialService,private router:Router,private activatedRoute:ActivatedRoute,private fb:FormBuilder){}
   
  ngOnInit(): void {
    this.updateForm=this.fb.group({
      id:[this.id],
      libelle:['',Validators.required],
      reserve:[false,Validators.required],
      quantite:['',Validators.required]
    })
    this.getMaterialById();
  }
  selectedReserve!:boolean;
  getMaterialById(){
    this.service.getMaterialById(this.id).subscribe((response)=>{
      this.updateForm.patchValue(response)
    })
  }
  updateMaterial(){
    this.service.updateMaterial(this.updateForm.value,this.updateForm.value.id).subscribe((response)=>{
      this.router.navigate(['/material']);
    })
  } 
}
