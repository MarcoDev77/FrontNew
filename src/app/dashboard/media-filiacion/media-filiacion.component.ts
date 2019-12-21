import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-media-filiacion',
  templateUrl: './media-filiacion.component.html',
  styleUrls: ['./media-filiacion.component.scss']
})
export class MediaFiliacionComponent implements OnInit {

  complexion: any;
  estatura: any;
  peso: any;
  tez: any;
  obj: any;

  constructor() {
    this.complexion = '';
    this.estatura = '';
    this.peso = '';
    this.tez = '';
    this.obj = {} as any;
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
}
