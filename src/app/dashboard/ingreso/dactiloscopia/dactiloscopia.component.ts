import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '@environment/environment';
import {AuthenticationService} from '@shared/services/authentication.service';
import Swal from 'sweetalert2';
import {Ingreso} from '@shared/models/Ingreso';
import {IngresoService} from '@shared/services/ingreso.service';

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
  public ingreso: Ingreso;
  public huella: Huella;
  public datosDactiloscopia: any;
  // Uploader
  public url: string;
  public uploader: FileUploader;
  public uo: FileUploaderOptions = {};
  public currentUploadImage: string;
  public currentImage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private ingresoService: IngresoService,
  ) {
    const ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    if (ingreso) {
      this.ingreso = ingreso;
    }
    this.isLoadingImages = true;
    this.uriNoImage = 'no_image';
    this.isLoadingDactiloscopia = true;
    this.iconLoading = '';
    this.currentUploadImage = '';
    this.nameImages = new DactiloscopiaImages();
    this.currentImage = '';
    this.huella = new Huella();
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({url: this.url + '/api/registrarHuellaDactilar', itemAlias: 'image'});
  }

  ngOnInit() {
    this.getData(this.ingreso.id);
    this.getDactiloscopia();
  }

  getData(id) {
    this.ingresoService.getIngreso(id).subscribe((data: any) => {
      this.ingreso = data.ingreso;
      this.ingreso.imputado.mainName = this.ingreso.imputado.apodos.find(item => item.principal);
      console.log('INGRESO', this.ingreso);
    });
  }

  getDactiloscopia() {
    this.ingresoService.getDactiloscopia(this.ingreso.id).subscribe((data: any) => {
      console.log('info', data);
      const {dactiloscopia} = data;
      dactiloscopia.huellasDactilares.forEach(item => this.setParameters(item));
    });
  }

  openFinder(input, name?) {
    console.log(name);
    input.focus();
    input.click();
    this.currentImage = name;
  }

  uploadFile() {
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = this.chooseParameters(this.currentImage);
    if (!this.uo.additionalParameter.clasificacion) {
      return Swal.fire({
        title: 'Cuidado',
        text: 'Se debe ingresar la clasificion de la huella antes.',
        icon: 'warning',
      });
    }
    this.uploader.setOptions(this.uo);
    console.log(this.uo);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.uploadAll();
    this.currentUploadImage = this.currentImage;
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }


  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const exit = JSON.parse(response);
    console.log(response);
    this.setImage(this.currentUploadImage, exit.imagen64);
    this.currentUploadImage = '';
    Swal.fire({
      title: exit.error ? 'Error!' : 'Guardado',
      text: exit.mensaje,
      icon: exit.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
    });
    this.uploader.progress = 0;
    this.uploader.clearQueue();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    this.currentUploadImage = '';
    const error = JSON.stringify(response); // error server response
    this.uploader.progress = 0;
    this.uploader.clearQueue();
    Swal.fire({
      title: 'Error',
      text: 'Error al guardado el archivo seleccionado',
      icon: 'error',
      timer: 1500,
      showConfirmButton: false
    });
  }

  chooseParameters(name): any {
    let data = {};
    switch (name) {
      case this.nameImages.pulgarDerecho:
        data = {
          clasificacion: this.huella.clasificacionPulgar,
          subclasificacion: this.huella.subclasificacionPulgar
        };
        break;
      case this.nameImages.pulgarIzquierdo:
        data = {
          clasificacion: this.huella.clasificacionPulgar2,
          subclasificacion: this.huella.subclasificacionPulgar2
        };
        break;
      case this.nameImages.indiceDerecho:
        data = {
          clasificacion: this.huella.clasificacionIndice,
          subclasificacion: this.huella.subclasificacionIndice
        };
        break;
      case this.nameImages.indiceIzquierdo:
        data = {
          clasificacion: this.huella.clasificacionIndice2,
          subclasificacion: this.huella.subclasificacionIndice2
        };
        break;
      case this.nameImages.medioDerecho:
        data = {
          clasificacion: this.huella.clasificacionMedio,
          subclasificacion: this.huella.subclasificacionMedio
        };
        break;
      case this.nameImages.medioIzquierdo:
        data = {
          clasificacion: this.huella.clasificacionMedio2,
          subclasificacion: this.huella.subclasificacionMedio2
        };
        break;
      case this.nameImages.anularDerecho:
        data = {
          clasificacion: this.huella.clasificacionAnular,
          subclasificacion: this.huella.subclasificacionAnular
        };
        break;
      case this.nameImages.anularIzquierdo:
        data = {
          clasificacion: this.huella.clasificacionAnular2,
          subclasificacion: this.huella.subclasificacionAnular2
        };
        break;
      case this.nameImages.meniqueDerecho:
        data = {
          clasificacion: this.huella.clasificacionMenique,
          subclasificacion: this.huella.subclasificacionMenique
        };
        break;
      case this.nameImages.meniqueIzquierdo:
        data = {
          clasificacion: this.huella.clasificacionMenique2,
          subclasificacion: this.huella.subclasificacionMedio2
        };
        break;
      default:
        data = {error: true};
    }
    return {...data, nombreHuella: name, ingresoId: this.ingreso.id};
  }

  setParameters(item) {
    switch (item.claveHuella) {
      case this.nameImages.pulgarDerecho.toLowerCase():
        this.huella.imgPulgar = item.imagen64;
        this.huella.clasificacionPulgar = item.clasificacion;
        this.huella.subclasificacionPulgar = item.subclasificacion;
        break;
      case this.nameImages.pulgarIzquierdo.toLowerCase():
        this.huella.imgPulgar2 = item.imagen64;
        this.huella.clasificacionPulgar2 = item.clasificacion;
        this.huella.subclasificacionPulgar2 = item.subclasificacion;
        break;
      case this.nameImages.indiceDerecho.toLowerCase():
        this.huella.imgIndice = item.imagen64;
        this.huella.clasificacionIndice = item.clasificacion;
        this.huella.subclasificacionIndice = item.subclasificacion;
        break;
      case this.nameImages.indiceIzquierdo.toLowerCase():
        this.huella.imgIndice2 = item.imagen64;
        this.huella.clasificacionIndice2 = item.clasificacion;
        this.huella.subclasificacionIndice2 = item.subclasificacion;
        break;
      case this.nameImages.medioDerecho.toLowerCase():
        this.huella.imgMedio = item.imagen64;
        this.huella.clasificacionMedio = item.clasificacion;
        this.huella.subclasificacionMedio = item.subclasificacion;
        break;
      case this.nameImages.medioIzquierdo.toLowerCase():
        this.huella.imgMedio2 = item.imagen64;
        this.huella.clasificacionMedio2 = item.clasificacion;
        this.huella.subclasificacionMedio2 = item.subclasificacion;
        break;
      case this.nameImages.anularDerecho.toLowerCase():
        this.huella.imgAnular = item.imagen64;
        this.huella.clasificacionAnular = item.clasificacion;
        this.huella.subclasificacionAnular = item.subclasificacion;
        break;
      case this.nameImages.anularIzquierdo.toLowerCase():
        this.huella.imgAnular2 = item.imagen64;
        this.huella.clasificacionAnular2 = item.clasificacion;
        this.huella.subclasificacionAnular2 = item.subclasificacion;
        break;
      case this.nameImages.meniqueDerecho.toLowerCase():
        this.huella.imgMenique = item.imagen64;
        this.huella.clasificacionMenique = item.clasificacion;
        this.huella.subclasificacionMenique = item.subclasificacion;
        break;
      case this.nameImages.meniqueIzquierdo.toLowerCase():
        this.huella.imgMenique2 = item.imagen64;
        this.huella.clasificacionMenique2 = item.clasificacion;
        this.huella.subclasificacionMenique2 = item.subclasificacion;
        break;
    }
  }

  setImage(name, base64) {
    switch (name) {
      case this.nameImages.pulgarDerecho:
        this.huella.imgPulgar = base64;
        break;
      case this.nameImages.pulgarIzquierdo:
        this.huella.imgPulgar2 = base64;
        break;
      case this.nameImages.indiceDerecho:
        this.huella.imgIndice = base64;
        break;
      case this.nameImages.indiceIzquierdo:
        this.huella.imgIndice2 = base64;
        break;
      case this.nameImages.medioDerecho:
        this.huella.imgMedio = base64;
        break;
      case this.nameImages.medioIzquierdo:
        this.huella.imgMedio2 = base64;
        break;
      case this.nameImages.anularDerecho:
        this.huella.imgAnular = base64;
        break;
      case this.nameImages.anularIzquierdo:
        this.huella.imgAnular2 = base64;
        break;
      case this.nameImages.meniqueDerecho:
        this.huella.imgMenique = base64;
        break;
      case this.nameImages.meniqueIzquierdo:
        this.huella.imgMenique2 = base64;
        break;
    }
  }
}


class Huella {
  imgPulgar: string;
  clasificacionPulgar: string;
  subclasificacionPulgar: string;
  imgIndice: string;
  clasificacionIndice: string;
  subclasificacionIndice: string;
  imgMedio: string;
  clasificacionMedio: string;
  subclasificacionMedio: string;
  imgAnular: string;
  clasificacionAnular: string;
  subclasificacionAnular: string;
  imgMenique: string;
  clasificacionMenique: string;
  subclasificacionMenique: string;
  // 2 = izquierda
  imgPulgar2: string;
  clasificacionPulgar2: string;
  subclasificacionPulgar2: string;
  imgIndice2: string;
  clasificacionIndice2: string;
  subclasificacionIndice2: string;
  imgMedio2: string;
  clasificacionMedio2: string;
  subclasificacionMedio2: string;
  imgAnular2: string;
  clasificacionAnular2: string;
  subclasificacionAnular2: string;
  imgMenique2: string;
  clasificacionMenique2: string;
  subclasificacionMenique2: string;

}

class DactiloscopiaImages {
  perfilFrente = 'PERFIL_FRENTE';
  perfilDerecho = 'PERFIL_DERECHO';
  perfilIzquierdo = 'PERFIL_IZQUIERDO';
  pulgarDerecho = 'PULGAR_DERECHO';
  pulgarIzquierdo = 'PULGAR_IZQUIERDO';
  indiceDerecho = 'INDICE_DERECHO';
  indiceIzquierdo = 'INDICE_IZQUIERDO';
  medioDerecho = 'MEDIO_DERECHO';
  medioIzquierdo = 'MEDIO_IZQUIERDO';
  anularDerecho = 'ANULAR_DERECHO';
  anularIzquierdo = 'ANULAR_IZQUIERDO';
  meniqueDerecho = 'MENIQUE_DERECHO';
  meniqueIzquierdo = 'MENIQUE_IZQUIERDO';
}
