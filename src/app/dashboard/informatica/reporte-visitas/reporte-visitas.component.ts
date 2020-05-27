import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-visitas',
  templateUrl: './reporte-visitas.component.html',
  styleUrls: ['./reporte-visitas.component.scss']
})
export class ReporteVisitasComponent implements OnInit {
  public isLoading: boolean;
  public ingreso;

  constructor() {
    this.ingreso = {};
  }

  ngOnInit() {
  }
  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
  }

  cleanForm() {
    this.ingreso = {};
  }

}
