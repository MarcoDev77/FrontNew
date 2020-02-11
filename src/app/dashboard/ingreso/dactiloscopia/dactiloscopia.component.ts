import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dactiloscopia',
  templateUrl: './dactiloscopia.component.html',
  styleUrls: ['./dactiloscopia.component.scss']
})
export class DactiloscopiaComponent implements OnInit {

  public isLoadingImages: boolean;
  public isLoadingDactiloscopia: boolean;
  public uriNoImage: string;
  public iconLoading: string;
  public nameImages: DactiloscopiaImages;

  constructor() {
    this.isLoadingImages = true;
    this.uriNoImage = 'no_image';
    this.isLoadingDactiloscopia = true;
    this.iconLoading = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
    this.nameImages = {
      perfilFrente: '',
      perfilDerecho: '',
      perfilIzquierdo: '',
      pulgarDerecho: '',
      pulgarIzquierdo: '',
      indiceDerecho: '',
      indiceIzquierdo: '',
      medioDerecho: '',
      medioIzquierdo: '',
      anularDerecho: '',
      anularIzquierdo: '',
      meniqueDerecho: '',
      meniqueIzquierdo: ''
    };
  }

  ngOnInit() {
  }

  showImages = () => {
    setTimeout(() => {
      this.isLoadingImages = false;
    }, 700);
  };

  showDatiloscopia = () => {
    setTimeout(() => {
      this.isLoadingDactiloscopia = false;
    }, 700);
  };

  openFinder(input, name?) {
    console.log(name);
    input.focus();
    input.click();
  }
}

class DactiloscopiaImages {
  perfilFrente: string;
  perfilDerecho: string;
  perfilIzquierdo: string;
  pulgarDerecho: string;
  pulgarIzquierdo: string;
  indiceDerecho: string;
  indiceIzquierdo: string;
  medioDerecho: string;
  medioIzquierdo: string;
  anularDerecho: string;
  anularIzquierdo: string;
  meniqueDerecho: string;
  meniqueIzquierdo: string;
}
