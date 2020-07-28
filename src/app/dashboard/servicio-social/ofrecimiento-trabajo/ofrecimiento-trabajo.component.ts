import {Component, OnInit} from '@angular/core';
import {Ingreso} from '@shared/models/Ingreso';

@Component({
  selector: 'app-ofrecimiento-trabajo',
  templateUrl: './ofrecimiento-trabajo.component.html',
  styleUrls: ['./ofrecimiento-trabajo.component.scss']
})
export class OfrecimientoTrabajoComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  public moreInnputs: any[];

  constructor() {
    this.ingreso = {} as Ingreso;
    this.moreInnputs = [
      {label: 'test', value: 'hola'},
      {label: 'test', value: 'hola'},
      {label: 'test', value: 'hola'},
      {label: 'test', value: 'hola'},
    ];
  }

  ngOnInit() {
  }

  searchImputado() {

  }
}
