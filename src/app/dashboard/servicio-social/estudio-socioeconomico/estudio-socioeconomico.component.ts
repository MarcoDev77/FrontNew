import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudio-socioeconomico',
  templateUrl: './estudio-socioeconomico.component.html',
  styleUrls: ['./estudio-socioeconomico.component.scss']
})
export class EstudioSocioeconomicoComponent implements OnInit {
  public ingreso : any
  public moreInputs: any[]
  constructor() { 
    this.ingreso= {} as any
    this.moreInputs = [
      {label: 'Ocupación', value: 'Carpintero'},
      {label: 'Domicilio', value: 'a'},
      {label: 'Lugar nacimiento', value: 'Mexico'},
      {label: 'Dialecto', value: 'Español'},
    ];
  }

  ngOnInit() {
  }

}
