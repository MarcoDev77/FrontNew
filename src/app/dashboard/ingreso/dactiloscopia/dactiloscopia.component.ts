import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '@environment/environment';
import {AuthenticationService} from '@shared/services/authentication.service';
import Swal from 'sweetalert2';

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
  // Uploader
  public url: string;
  public uploader: FileUploader;
  public uo: FileUploaderOptions = {};
  public currentUploadImage: string;
  public currentImage: string;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.isLoadingImages = true;
    this.uriNoImage = 'no_image';
    this.isLoadingDactiloscopia = true;
    this.iconLoading = '';
    this.currentUploadImage = '';
    this.nameImages = new DactiloscopiaImages();
    this.currentImage = '';
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({url: this.url + '/api/registrarHuellaDactilar', itemAlias: 'image'});
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
    this.currentImage = name;
  }

  uploadFile() {
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = {idIngreso: 1, imagen: 'PULGAR_DERECHO'};
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
