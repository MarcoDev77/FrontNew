import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-actividades',
  templateUrl: './plan-actividades.component.html',
  styleUrls: ['./plan-actividades.component.scss']
})
export class PlanActividadesComponent implements OnInit {
  public data = [];
  public isLoading :boolean
  constructor() { 
    this.isLoading=false
  }
  
  ngOnInit() {
  }

  switch($event){
    
  }

}