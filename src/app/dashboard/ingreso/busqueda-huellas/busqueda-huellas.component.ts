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
  @Input() from;
  public action;
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
  // paginador
  public max = 1;
  public offset = 0;

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
    this.uploader = new FileUploader({url: this.url + '/api/buscarPersonaIngresadaHuella', itemAlias: 'image'});
    // Ver resultados anteriores
    if (location.href.includes('busqueda-huella') && JSON.parse(localStorage.getItem('results'))) {
      this.results = JSON.parse(localStorage.getItem('results'));
      if (this.results.length > 0) {
        this.finished = true;
        this.action = 'SEARCH';
      } else {
        this.clearResults();
      }
    }
  }

  handleResults(data) {
    Swal.fire({
      title: data.error ? 'Error!' : 'Resultados',
      text: data.mensaje,
      icon: data.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    });
    if (!data.error) {
      if (data.coincidenciasEncontradas && data.coincidenciasEncontradas.length > 0) {
        this.results = data.coincidenciasEncontradas;
        this.saveResults();
      } else {
        this.finished = false;
        this.index = null;
      }
    } else {
      console.log('hay error');
      this.finished = false;
    }
    if (location.href.includes('lista-ingreso')) {
      this.action = 'ADD';
      if (data.coincidenciasEncontradas.length === 0) {
        this.action = 'CREATE';
        this.handleAction();
      }
    } else if (location.href.includes('busqueda-huella')) {
      this.action = 'SEARCH';
    } else {
      return;
    }
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.finished = true;
    const data = JSON.parse(response);
    console.log(data);
    this.clearIntetval();
    this.handleResults(data);
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

  handleAction(item?) {
    console.log('entrea', this.action);
    this.modalService.dismissAll();
    switch (this.action) {
      case 'ADD':
        console.log('se crea un nuevo ingreso para ese imputado', item);
        this.addIngresoToPersona(item.id);
        break;
      case 'CREATE':
        console.log('Se crea nuevo registro de persoana');
        this.createPersona();
        break;
      case 'SEARCH':
        console.log('Busqueda');
        this.seeHuellas(item);
        break;
      default:
        return;
    }
  }

  createPersona() {
    Swal.fire({
      title: 'No se encontraron coincidencias',
      text: 'Se creará un registro de una nueva persona',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.generateFolio().subscribe((data: any) => {
          console.log('generateFolio', data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Folio generado',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1000,
            showConfirmButton: false
          }).then(() => {
            if (!data.error) {
              const ingreso = {id: data.imputadoId, folio: data.folioGenerado};
              sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
              this.router.navigate([`dashboard/ingreso/form-ingreso`]);
            }
          });
        });
      }
    });
  }

  addIngresoToPersona(idPersona) {
    Swal.fire({
      title: 'Registrar nuevo ingreso',
      text: 'Se creará un registro de ingreso a esa persona',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.generateFolio(idPersona).subscribe((data: any) => {
          console.log('generateFolio', data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Folio generado',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1000,
            showConfirmButton: false
          }).then(() => {
            if (!data.error) {
              const ingreso = {id: data.imputadoId, folio: data.folioGenerado};
              sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
              this.router.navigate([`dashboard/ingreso/form-ingreso`]);
            }
          });
        });
      }
    });
  }

  seeHuellas(item) {
    localStorage.setItem('resultado', JSON.stringify(item));
    this.router.navigate(['dashboard/ingreso/busqueda-huella-detalle']);
  }

  saveResults() {
    localStorage.setItem('results', JSON.stringify(this.results));
  }

  clearResults() {
    this.results = [];
    localStorage.removeItem('results');
    this.finished = false;
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
}
