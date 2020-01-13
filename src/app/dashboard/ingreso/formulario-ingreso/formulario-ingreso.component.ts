import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent implements OnInit {

  public ingreso: any;

  constructor() {
    this.ingreso = {} as any;
  }

  ngOnInit() {
  }

}
