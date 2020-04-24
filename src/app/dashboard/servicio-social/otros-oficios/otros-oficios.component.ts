import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';

@Component({
  selector: 'app-otros-oficios',
  templateUrl: './otros-oficios.component.html',
  styleUrls: ['./otros-oficios.component.scss']
})
export class OtrosOficiosComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public formats = [];

  constructor() {
    this.ingreso = {} as Ingreso;
    this.formats = [
      { 
        name: 'Oficio que emite el director general de sanciones',
        description: 'lorem',
        methodToGenerate: this.generate
      },
      { 
        name: 'Prevención y readaptación social (Oficio)',
        description: 'algo',
        methodToGenerate: this.generateOther
      }
    ];
  }

  ngOnInit() {
  }

  searchImputado() {

  }

  generate() {
    console.log('Se genera');
  }

  generateOther() {
    console.log('Se genera otro');
  }

}
