import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../service/material.service';
import { Imaterial } from '../model/imaterial';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrls: []
})

export class ListMaterialComponent implements OnInit{
  
  materials!:Imaterial[];
  constructor(private service:MaterialService,private router:Router){}
  ngOnInit(): void {
    this.service.getAllMaterials().subscribe((m)=>this.materials=m);
  }
 
  deleteMaterial(id:number){
    this.service.deleteMaterial(id).subscribe((response)=>{
      this.router.navigate(['user/material']);
      this.ngOnInit();
    })
  }
}
