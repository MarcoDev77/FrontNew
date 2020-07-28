import {Component, Input, OnInit} from '@angular/core';
import {FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '@environment/environment';
import Swal from 'sweetalert2';
import {AuthenticationService} from '@shared/services/authentication.service';
import {IngresoService} from '@shared/services/ingreso.service';

@Component({
  selector: 'app-fotos-extra-ingreso',
  templateUrl: './fotos-extra-ingreso.component.html',
  styleUrls: ['./fotos-extra-ingreso.component.scss']
})
export class FotosExtraIngresoComponent implements OnInit {
  @Input() ingresoId;
  public photos = [];
  public isLoading: boolean;

  // Uploader
  public url: string;
  public uo: FileUploaderOptions = {};
  public uploader: FileUploader;

  constructor(private authenticationService: AuthenticationService, private ingresoService: IngresoService) {
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({url: this.url + '/api/registrarHuellaDactilar', itemAlias: 'image'});
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.ingresoService.getForografiasImputado(this.ingresoId).subscribe((data: any) => {
      this.isLoading = false;
      console.log('getForografiasImputado', data);
      if (!data.error) {
        this.photos = data.fotografias;
      }
    });
  }

  openFinder(inputFile) {
    inputFile.click();
  }

  uploadFile(inptuFile?) {
    const authToken = this.authenticationService.getCurrentUser().access_token;
    this.uo.authTokenHeader = 'Authorization';
    this.uo.authToken = `Bearer ${authToken}`;
    this.uo.additionalParameter = {
      esHuella: 'fotografia',
      ingresoId: this.ingresoId,
      claveFotografia: 'FOTO_EXTRA_' + (this.photos.length + 1),
      tipoImagen: inptuFile.files[0].type.split('/')[1],
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
    console.log('se sube');
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const exit = JSON.parse(response);
    console.log(response);
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
    console.log(response);
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
