import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '@environment/environment';
import Swal from 'sweetalert2';
import {AuthenticationService} from '@shared/services/authentication.service';
import {IngresoService} from '@shared/services/ingreso.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busqueda-huellas',
  templateUrl: './busqueda-huellas.component.html',
  styleUrls: ['./busqueda-huellas.component.scss']
})
export class BusquedaHuellasComponent {

  @Input() ingresoId;
  // Uploader
  public url: string;
  public uploader: FileUploader;
  public uo: FileUploaderOptions = {};
  public huella: any;
  public intervalId: any;
  public images: any[];
  public index: number;
  public finished: boolean;
  public results = [];

  constructor(
    private authenticationService: AuthenticationService,
    private ingresoService: IngresoService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.index = null;
    this.images = [
      'assets/img/lopper/uno.jpg',
      'assets/img/lopper/dos.jpg',
      'assets/img/lopper/tres.jpg',
      'assets/img/lopper/cuatro.jpg',
      // 'assets/img/lopper/cinco.jpg',
      'assets/img/lopper/seis.jpg',
      'assets/img/lopper/siete.jpg',
      'assets/img/lopper/ocho.jpg',
      'assets/img/lopper/nueve.jpg',
    ];
    this.huella = {} as any;
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({url: this.url + '/api/buscarHuellaDactilar', itemAlias: 'image'});
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.finished = true;
    const data = JSON.parse(response);
    console.log(data);
    this.clearIntetval();
    if (data.coincidenciasEncontradas && data.coincidenciasEncontradas.length > 0) {
      this.modalService.dismissAll();
      return Swal.fire({
        title: 'Resultados',
        text: 'No se encontraron coincidencias',
        icon: 'warning'
      });
    }
    Swal.fire({
      title: data.error ? 'Error!' : 'Guardado',
      text: data.mensaje,
      icon: data.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
      this.results = data.coincidenciasEncontradas;
    });
    this.uploader.progress = 0;
    this.uploader.clearQueue();
  }

  uploadFile() {
    this.setupInterval();
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = {};
    this.uploader.setOptions(this.uo);
    console.log(this.uo);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.uploadAll();
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    this.clearIntetval();
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
    this.finished = true;
  }

  setupInterval() {
    this.intervalId = setInterval(() => {
      this.index = this.getRandomInt(0, this.images.length - 1);
    }, 100);
  }

  clearIntetval() {
    clearInterval(this.intervalId);
  }

  openFinder(inputFile: HTMLInputElement) {
    inputFile.click();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectIngreso(item) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se importaran las huellas de ese ingreso.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        console.log(item);
        this.ingresoService.selectIngresoDactiloscopia(this.ingresoId, item.id).subscribe((data: any) => {
          console.log('DATA', data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Guardado',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1000,
            showConfirmButton: false
          }).then(() => {
            if (!data.error) {
              this.modalService.dismissAll();
              this.router.navigate(['dashboard/ingreso/dactiloscopia']);
            }
          });
        });
      }
    });
  }
}
