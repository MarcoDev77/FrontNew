import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Custodio } from '@shared/models/Custodio';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import { Nombramiento } from '@shared/models/Nombramiento';
import Swal from 'sweetalert2';
import { Capacitacion } from '@shared/models/Capacitacion';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-custodios',
  templateUrl: './custodios.component.html',
  styleUrls: ['./custodios.component.scss']
})
export class CustodiosComponent implements OnInit {

  public custodios: Custodio[];
  public custodio: Custodio;
  public capacitaciones: any[];
  public isLoading: boolean;
  public nombramientos: Nombramiento[];
  // Uploader
  public url: string;
  public uploader: FileUploader;
  public uo: FileUploaderOptions = {};
  // Table atributes
  public auxId: any;
  public isForm = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public selectedRow: number;
  public setClickedRow: (i) => void;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private serguridadCustodiaService: SeguridadCustodiaService,
    private authenticationService: AuthenticationService) {
    this.custodios = [];
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({ url: this.url + '/api/registrarFotoPerfilCustodio', itemAlias: 'image' });
  }

  ngOnInit() {
    this.getData();
    this.getNombramientos();
    this.getCapacitaciones();
  }

  getData() {
    this.isLoading = true;
    this.serguridadCustodiaService.listCustodios().subscribe((data: any) => {
      this.isLoading = false;
      this.custodios = data.custodios;
    });
  }

  getCapacitaciones() {
    this.serguridadCustodiaService.getCapacitaciones().subscribe((data: any) => {
      this.capacitaciones = data.capacitaciones;
    })
  }

  getCapacitacionesByCustodio(custodio: Custodio) {
    this.isLoading = true;
    this.custodio = { ...custodio }
    this.capacitaciones.map(cap => {
      cap.isChecked = false;
      return cap;
    })
    this.serguridadCustodiaService.getCapacitacionesByCustodio(custodio.id).subscribe((data2: any) => {
      this.isLoading = false;
      for (const cap of this.capacitaciones) {
        for (const capCus of data2.capacitaciones) {
          if (cap.id === capCus.id) {
            cap.isChecked = true;
            break;
          }
        }
      }
    }, error => {
      this.isLoading = false;
    });
  }

  saveAsistencia(capacitacion) {
    this.isLoading = true;
    const model = {
      custodio: {
        id: this.custodio.id
      },
      capacitacion: {
        id: capacitacion.id,
      },
    };

    this.serguridadCustodiaService.saveAsistencia(model).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      })
      if (!data.error) {
        this.getCapacitacionesByCustodio(this.custodio);
      }
    }, error => {
      this.isLoading = false;
    });
  }

  submit() {
    this.isLoading = true;
    this.serguridadCustodiaService.saveCustodio(this.custodio).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      }).then(() => {
        this.modalService.dismissAll();
        if (!data.error) {
          this.getData();
        }
      });
    });
  }

  update(custodio: Custodio, modal) {
    this.openModal(modal, { custodio, isNew: false });
  }

  clickInputFile(item, inputFile) {
    this.custodio = { ...item };
    inputFile.click();
  }

  seeCapacitaciones(modal, custodio: Custodio) {
    this.getCapacitacionesByCustodio(custodio);
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  toggleStatus(id) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.serguridadCustodiaService.changeStatusCustodio(id).subscribe((data: any) => {
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getData();
            }
          });
        });
      }
    })
  }

  uploadPhoto(inputFile: HTMLInputElement) {
    if (inputFile.files[0]) {
      this.isLoading = true;
      const authToken = this.authenticationService.getCurrentUser().access_token;
      this.uo.authTokenHeader = 'Authorization';
      this.uo.authToken = `Bearer ${authToken}`;
      this.uo.additionalParameter = {
        custodioId: this.custodio.id
      };
      this.uploader.setOptions(this.uo);
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      };
      this.uploader.uploadAll();
      this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
      this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
      inputFile.files = null;
    }
  }

  openModal(modal, config?: any) {
    if (config.isNew) {
      this.custodio = {} as Custodio;
      this.custodio.nombramiento = {};
      this.custodio.formacionInicial = false;
    } else {
      this.custodio = { ...config.custodio };
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  getNombramientos() {
    this.serguridadCustodiaService.listNombramientos().subscribe((data: any) => {
      this.nombramientos = data.nombramiento;
    });
  }
  // Uploader methods
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.isLoading = false;
    const exit = JSON.parse(response);
    Swal.fire({
      title: exit.error ? 'Error!' : 'Guardado',
      text: exit.mensaje,
      icon: exit.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
      this.getData();
    });
    this.uploader.progress = 0;
    this.uploader.clearQueue();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.isLoading = false;
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

  // Table methods
  switch = e => this.p = e;

  sort(key) {
    if (key === this.key) {
      this.reverse = !this.reverse;
      if (this.reverse === false) {
        this.key = 'id';
        this.reverse = true;
      }
    } else {
      this.key = key;
      this.reverse = false;
    }
  }
}
