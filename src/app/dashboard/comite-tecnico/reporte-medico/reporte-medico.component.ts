import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { AuthenticationService } from '@shared/services/authentication.service';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import { environment } from '@environment/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte-medico',
  templateUrl: './reporte-medico.component.html',
  styleUrls: ['./reporte-medico.component.scss']
})
export class ReporteMedicoComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public clave = 'informe_medico';
  public comentarios = '';
  public doc: any;
  // Uploader
  public url: string;
  public uploaderMedico: FileUploader;
  public uo: FileUploaderOptions = {};
  // file preview
  public file: any;

  constructor(
    private authenticationService: AuthenticationService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;
    this.doc = {};
    this.url = environment.apiUrl;
    this.uploaderMedico =
      new FileUploader({ url: this.url + '/api/registrarDocumentoGuardado', itemAlias: 'documento' });
  }

  ngOnInit() {
  }

  searchImputado() {
    this.isLoading = true;
    this.resetUploaders();
    this.comiteTecnicoService.getImputadoByFolioGeneral(this.ingreso.folio).subscribe((data: any) => {
      console.log('Data', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Búsqueda',
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
      Swal.fire({
        title: 'Error!',
        text: 'Error al realizar la búsqueda',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      this.isLoading = false;
      console.log(error);
    });
  }

  checkDocuments() {
    this.comiteTecnicoService.getDatosDocumentosGuardados(this.clave, this.ingreso.imputado.id)
      .subscribe((data: any) => {
        if (!data.error) {
          this.doc = data.documento;
          this.comentarios = data.documento.comentarios;
          console.log('docs', this.doc);
        }
      });
  }

  submit(inputFile) {
    // Check file is not empty
    if (inputFile.files.length === 0) {
      return this.resetUploaders();
    }
    this.isLoading = true;
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = {
      claveDocumento: this.clave,
      comentarios: this.comentarios,
      imputadoId: this.ingreso.imputado.id
    };
    console.log(this.uo);
    this.uploaderMedico.setOptions(this.uo);
    this.uploaderMedico.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploaderMedico.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploaderMedico.uploadAll();
    this.uploaderMedico.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploaderMedico.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  generatePDF(modal) {
    this.isLoading = true;
    this.comiteTecnicoService.generatePDFDocumentoGuardado(this.clave, this.ingreso.imputado.id)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.showPreview(data, modal);
      }, error => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Error al generar el documento.',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        });
        console.log(error);
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
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.isLoading = false;
    const exit = JSON.parse(response);
    console.log(response);
    Swal.fire({
      title: exit.error ? 'Error!' : 'Guardado',
      text: exit.mensaje,
      icon: exit.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
    });
    this.resetUploaders();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.isLoading = false;
    console.log(response);
    const error = JSON.stringify(response); // error server response
    this.resetUploaders();
    Swal.fire({
      title: 'Error',
      text: 'Error al guardado el archivo seleccionado',
      icon: 'error',
      timer: 1500,
      showConfirmButton: false
    });
  }

  resetUploaders() {
    this.uploaderMedico.progress = 0;
    this.uploaderMedico.clearQueue();
  }
}
