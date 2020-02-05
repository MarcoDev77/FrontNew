import { Component, OnInit } from '@angular/core';
import {Mediafiliacion} from '@shared/models/MediaFiliacion';

@Component({
  selector: 'app-media-afiliacion',
  templateUrl: './media-afiliacion.component.html',
  styleUrls: ['./media-afiliacion.component.scss']
})
export class MediaAfiliacionComponent implements OnInit {

  complexion: any;
  estatura: any;
  peso: any;
  tez: any;
  obj: any;
  public mediaFiliacion: Mediafiliacion;
  constructor() {
    this.complexion = '';
    this.estatura = '';
    this.peso = '';
    this.tez = '';
    this.obj = {} as any;
    this.mediaFiliacion= {} as any;
  }

  ngOnInit() {
  }

  getComplexion(id) {
    switch (id) {
      case '1':
        return 'Delgada';
        break;
      case '2':
        return 'Regular';
        break;
      case '3':
        return 'Atlética';
        break;
      case '4':
        return 'Robusta';
        break;
      case '5':
        return 'Obesa';
        break;
    }
  }

  guardarMediaFiliacion(){
      
  }
}
