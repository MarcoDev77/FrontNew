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
  public entrevista: any;
  // Table attributes
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;

  constructor() { 
    this.ingreso = {} as Ingreso;
  }

  ngOnInit() {
  }

  searchImputado() {

  }

}
