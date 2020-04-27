import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.scss']
})
export class NucleoFamiliarComponent implements OnInit {

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
