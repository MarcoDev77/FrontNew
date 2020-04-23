import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';

@Component({
  selector: 'app-control-entrevista',
  templateUrl: './control-entrevista.component.html',
  styleUrls: ['./control-entrevista.component.scss']
})
export class ControlEntrevistaComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;

  constructor() { 
    this.ingreso = {} as Ingreso;
  }

  ngOnInit() {
  }

  searchImputado() {

  }

}
