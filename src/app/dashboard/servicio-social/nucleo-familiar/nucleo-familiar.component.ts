import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { NucleoFamiliar } from '@shared/models/NucleoFamiliar';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.scss']
})
export class NucleoFamiliarComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public nucleo : NucleoFamiliar;

  constructor() {
    this.ingreso = {} as Ingreso;
    this.nucleo = new NucleoFamiliar();
    this.nucleo.parentescoAvalMoral = {} as any;
    this.nucleo.parentescoVivira = {} as any;
  }

  ngOnInit() {
  }

  searchImputado() {

  }

}
