import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajo-social',
  templateUrl: './trabajo-social.component.html',
  styleUrls: ['./trabajo-social.component.scss']
})
export class TrabajoSocialComponent implements OnInit {
  public isLoading: false;
  public generalidadesPPL: GeneralidadesPPL;
  
  constructor() { 
    this.generalidadesPPL= {} as any
    this.isLoading=false;
  }

  ngOnInit() {
  }


  searchImputado(){}
}

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: any;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
  ficha:any
  imputado: any
}