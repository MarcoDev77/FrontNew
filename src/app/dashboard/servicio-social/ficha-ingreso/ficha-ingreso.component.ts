import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';

@Component({
  selector: 'app-ficha-ingreso',
  templateUrl: './ficha-ingreso.component.html',
  styleUrls: ['./ficha-ingreso.component.scss']
})
export class FichaIngresoComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  constructor() { 
    this.ingreso= {} as any
  }

  ngOnInit() {
  }

  searchImputado(){

  };
}
