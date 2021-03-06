import { Component, OnInit } from '@angular/core';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '@environment/environment';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Ingreso } from '@shared/models/Ingreso';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resultados-examenes',
  templateUrl: './resultados-examenes.component.html',
  styleUrls: ['./resultados-examenes.component.scss']
})
export class ResultadosExamenesComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public docs = [];
  // Uploader
  public url: string;
  public uploaderMedico: FileUploader;
  public uploaderOdontologico: FileUploader;
  public uploaderPsicologico: FileUploader;
  public uo: FileUploaderOptions = {};
  // Preview
  public file: any;

  constructor(
    private authenticationService: AuthenticationService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;
    // Uploader
    this.url = environment.apiUrl;
    this.uploaderMedico = new FileUploader({ url: this.url + '/api/registrarDocumentoResultadoExamen', itemAlias: 'documento' });
    this.uploaderOdontologico = new FileUploader({ url: this.url + '/api/registrarDocumentoResultadoExamen', itemAlias: 'documento' });
    this.uploaderPsicologico = new FileUploader({ url: this.url + '/api/registrarDocumentoResultadoExamen', itemAlias: 'documento' });
  }

  ngOnInit() {
  }

  uploadFile(input, clave, uploader) {
    if (input.files.length === 0) {
      return this.resetUploaders();
    }
    this.isLoading = true;
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = {
      claveDocumento: clave,
      imputadoId: this.ingreso.imputado.id
    };
    uploader.setOptions(this.uo);
    uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    uploader.uploadAll();
    uploader.onErrorItem = (item, response, status, headers) =>
      this.onErrorItem(item, response, status, headers, input);
    uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers, input);

  }

  searchImputado() {
    this.isLoading = true;
    this.resetUploaders();
    this.comiteTecnicoService.getImputadoByFolioGeneral(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
        this.checkDocuments();
      } else {
        this.ingreso = {} as Ingreso;
      }
    }, error => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Error al realizar la busqueda',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  searchDocuments(clave, modal) {
    try {
      switch (clave) {
        case 'examen_medico':
          this.isLoading = true;
          this.comiteTecnicoService.buscarDocumentoResultadoExamen(this.ingreso.imputado.id, clave)
            .subscribe((data: any) => {
              this.isLoading = false;
              this.showPreview(data, modal);
            });
          break;
        case 'examen_odontologico':
          this.isLoading = true;
          this.comiteTecnicoService.buscarDocumentoResultadoExamen(this.ingreso.imputado.id, clave)
            .subscribe((data: any) => {
              this.isLoading = false;
              this.showPreview(data, modal);
            });
          break;
        case 'examen_psicologico':
          this.isLoading = true;
          this.comiteTecnicoService.buscarDocumentoResultadoExamen(this.ingreso.imputado.id, clave)
            .subscribe((data: any) => {
              this.isLoading = false;
              this.showPreview(data, modal);
            });
          break;
      }
    } catch (error) {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Error al generar el documento.',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    }

  }

  checkDocuments() {
    this.comiteTecnicoService.checkDocumentsResultadosImputado(this.ingreso.imputado.id)
      .subscribe((data: any) => {
        if (!data.error) {
          this.docs = data.documentos;
        }
      });
  }

  showPreview(data, modal) {
    const file = new Blob([data], { type: 'application/*' });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = ev => this.isLoading = true;
    reader.onloadend = () => {
      this.isLoading = false;
      let dataUrl: any;
      dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      this.modalService.dismissAll();
      if (base64) {
        this.file = base64;
        this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
      }
    };
    reader.onerror = () => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
      this.modalService.dismissAll();
    };
  }

  // Uploader methods
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders, input: any): any {
    const exit = JSON.parse(response);
    input.value = null;
    Swal.fire({
      title: exit.error ? 'Error!' : 'Guardado',
      text: exit.mensaje,
      icon: exit.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => this.isLoading = false);
    this.checkDocuments();
    this.resetUploaders();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders, input: any): any {
    this.isLoading = false;
    input.value = null;
    const error = JSON.stringify(response); // error server response
    this.resetUploaders();
    Swal.fire({
      title: 'Error',
      text: 'Error al guardado el archivo seleccionado',
      icon: 'error',
      timer: 1500,
      showConfirmButton: false
    }).then(() => this.isLoading = false)
  }

  resetUploaders() {
    this.uploaderPsicologico.progress = 0;
    this.uploaderPsicologico.clearQueue();
    this.uploaderMedico.progress = 0;
    this.uploaderMedico.clearQueue();
    this.uploaderOdontologico.progress = 0;
    this.uploaderOdontologico.clearQueue();
  }

}
