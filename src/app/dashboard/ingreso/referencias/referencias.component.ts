import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IngresoService } from '@shared/services/ingreso.service';
import { Ingreso } from '@shared/models/Ingreso';
import { Referencia } from '@shared/models/Referencia';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '@environment/environment';
import { AuthenticationService } from '@shared/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss']
})
export class ReferenciasComponent implements OnInit {
  public referencia: Referencia;
  public ingreso: Ingreso;
  public data: any;
  public isLoading: boolean;
  public paises: any;
  public arrayToFilter: any;
  public estados: any;
  public parentescos: any[];
  public estadosCiviles: any[];
  public pasePermanente: PasePermanente;
  public menor: any;
  // FilePreview
  public file: any;
  // Uploader
  public url: string;
  public uploader: FileUploader;
  public uo: FileUploaderOptions = {};
  // Table Attributes
  public selectedRow: number;
  public setClickedRow: Function;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public isForm: boolean;
  public roles = []

  form: FormGroup;

  constructor(private catalogosService: CatalogosService,
    private router: Router,
    private modalService: NgbModal,
    private ingresoService: IngresoService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder
  ) {
    this.isLoading = false;
    this.ingreso = {} as Ingreso;
    this.paises = [];
    this.estados = [];
    this.arrayToFilter = [];
    this.data = [];
    this.referencia = {} as any;
    this.parentescos = [];
    this.estadosCiviles = [];
    this.referencia.estadoCivil = {} as any;
    this.referencia.parentesco = {} as any;
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    const user = authenticationService.getCurrentUser()
    this.roles = user.roles;
    if (this.ingreso) {
      this.listReferencias(this.ingreso.id);
    }
    // Uploader
    this.url = environment.apiUrl;
    this.uploader = new FileUploader({ url: this.url + '/api/subirFotoPerfilReferencia', itemAlias: 'imagen' });
    // Table
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };

    // this.form = this._formBuilder.group({
      
    // });
  }

  ngOnInit() {
    this.catalogosService.listPaises()
      .subscribe((data: any) => this.paises = data.paises);
    this.getEstadosCiviles();

    this.getEstado();
    this.getParentescos();
  }

  getEstadosCiviles() {
    this.catalogosService.listEstadosCiviles().subscribe((data: any) => {
      this.estadosCiviles = data.estadosCiviles
    })
  }

  getEstado() {
    this.catalogosService.listEstados('mexico', null)
      .subscribe((data: any) => {
        this.estados = data.estados;
      });
  }

  listReferencias(id) {
    this.ingresoService.listRefencias(id).subscribe((data: any) => {
      this.data = data.referenciasPersonales;
    });
  }

  saveReferencia() {

    this.referencia.imputado = {
      id: this.ingreso.id
    };
    this.referencia.fechaNacimiento = this.datePipe.transform(this.referencia.fechaNacimiento, 'yyyy-MM-dd');
    this.ingresoService.saveReferencia(this.referencia).subscribe((data: any) => {
      if (!data.error) {
        this.referencia = {} as any;
        this.listReferencias(this.ingreso.id);
        this.modalService.dismissAll();
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });

    });
  }

  deleteReferencia(id) {
    this.ingresoService.deleteReferencia(id).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });

      this.listReferencias(this.ingreso.id);
    });
  }

  showModal(modal, item?) {
    if (item) {
      this.referencia = item;
    } else {
      this.referencia = {} as Referencia;
      this.referencia.parentesco = {} as any;
      this.referencia.estadoCivil = {} as any;
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  selectArrayTofilter(array) {
    this.arrayToFilter = array;
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      map(term => term === '' ? []
        : this.arrayToFilter.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  };
  formatter = (x: { nombre: string }) => x.nombre;

  switch = $event => this.p = $event;

  getParentescos() {
    this.ingresoService.getParentescos().subscribe((data: any) => {
      this.parentescos = data.parentescos;
    });
  }

  async generatePaseUnico(item: any, modal) {
    const steps: any[] = ['Ingrese el área'];
    const progressSteps: any[] = ['1'];
    let options = [];

    if (!item.esMayorEdad) {
      options = this.filterDataToOptions(this.data);

      progressSteps.push(['2'], ['3']);

      const stepsArray = [
        {
          title: 'Ingrese el folio',
          input: 'text',
          inputPlaceholder: 'Folio',
          validationMessage: 'Ingrese el folio',
          inputAttributes: {
            required: 'required'
          }
        },
        {
          title: 'Seleccione el adulto',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Adulto responsable',
          validationMessage: 'Seleccione el adulto responsable',
          inputAttributes: {
            required: 'required'
          },
        }
      ];
      steps.push(...stepsArray);
    }

    steps.push({
      title: 'Observaciones',
      input: 'text',
      inputPlaceholder: 'Observaciones',
      validationMessage: 'Observaciones',
    });

    const result = await Swal.mixin({
      progressSteps,
      input: 'text',
      text: 'Complete los pasos',
      inputPlaceholder: 'Ingrese el área',
      validationMessage: 'Ingrese el área',
      inputAttributes: {
        required: 'required'
      },
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).queue(steps);

    if (result.dismiss) {
      return;
    }

    const model = {
      id: null,
      referenciaPersonal: {
        id: item.id
      },
      tipoPase: item.esMayorEdad ? 'adulto' : 'infante',
      nombreVisitante: `${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`,
      domicilio: `${item.municipio} ${item.estado.nombre}, ${item.colonia} ${item.calleNumero}`,
      area: result.value[0],
      observaciones: item.esMayorEdad ? result.value[1] : result.value[3],
      nombreResponsable: '',
      folio: result.value[1]
    };

    if (!item.mayorEdad) {
      model.nombreResponsable = options[result.value[2]];
    }

    this.ingresoService.savePaseProvisional(model).subscribe((data: any) => {
      this.showPreview(data, modal);
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }

  filterDataToOptions(array) {
    return array.map((ref: Referencia) => {
      if (ref.esMayorEdad && ref.estaVivo) {
        return `${ref.nombre} ${ref.apellidoPaterno} ${ref.apellidoMaterno}`;
      }
    }).filter(ref => ref);
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

  async generatePaseMensual(item: Referencia, modal) {
    if (!item.esMayorEdad || !item.estaVivo) {
      return;
    }

    let infantes = [];

    const childs = await Swal.fire({
      title: 'Ingresa el número de infantes',
      input: 'select',
      inputOptions: {
        0: 'Sin infantes',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      inputAttributes: {
        required: 'required',
      },
      validationMessage: 'Ingresa el número de infantes',
      inputPlaceholder: 'Número de infantes'
    });

    if (childs.dismiss) {
      return;
    }

    if (childs.value !== '0') {
      const progressSteps = [];
      const steps = [];

      for (let i = 0; i < Number(childs.value); i++) {
        progressSteps.push([`${i + 1}`]);
        steps.push({
          title: `Nombre del infante ${i + 1}`,
          input: 'text',
          inputPlaceholder: 'Nombre',
          validationMessage: 'Ingrese el nombre del infante',
          inputAttributes: {
            required: 'required'
          },
        });
      }

      steps.push({
        title: 'Observaciones',
        input: 'text',
        inputPlaceholder: 'Observaciones',
        validationMessage: 'Observaciones',
      });

      const result = await Swal.mixin({
        progressSteps,
        input: 'text',
        text: 'Complete los pasos',
        inputPlaceholder: 'Ingrese el área',
        validationMessage: 'Ingrese el área',
        inputAttributes: {
          required: 'required'
        },
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).queue(steps);

      if (result.dismiss) {
        return;
      }
      infantes = result.value;
    }

    const observaciones = infantes[Number(childs.value)];
    infantes.pop();

    const model = {
      tipoPase: 'mensual',
      observaciones,
      nombreVisitante: `${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`,
      parentesco: item.parentesco,
      imputado: this.ingreso,
      menores: this.mapChilds(infantes),
      referenciaPersonal: { id: item.id }
    };

    this.ingresoService.savePaseProvisional(model).subscribe((data: any) => {
      this.showPreview(data, modal);
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }

  mapChilds(array) {
    return array.map(child => ({ nombre: child }));
  }

  generateControlVisitas(modal) {
    this.ingresoService.generatePDFControlVisitas(this.ingreso.id).subscribe((data: any) => {
      this.showPreview(data, modal);
    });
  }

  showModalPasePermanente(item, modal) {
    this.pasePermanente = {} as PasePermanente;
    this.pasePermanente.menores = [];
    this.menor = {};
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
    this.referencia = item;
  }

  addMenorPasePermanente(inputs: any[]) {
    if (this.validateFiels(inputs)) {
      const model = this.menor;
      this.menor = {};
      this.pasePermanente.menores = [...this.pasePermanente.menores, model];
      this.isForm = false;
    }
  }

  deleteMenorPasePermanente(item: any) {
    const index = this.pasePermanente.menores.indexOf(item);
    this.pasePermanente.menores.slice(index, 1);
  }

  generatePasePermanente(modal) {
    if (this.pasePermanente.tipoPase === 'colectivo' && this.pasePermanente.menores.length === 0) {
      return Swal.fire(
        'Cuidado',
        'Cuando el pase es colectivo se tiene que agregar menores la pase',
        'warning'
      );
    }
    this.pasePermanente.referenciaPersonal = { id: this.referencia.id };
    console.log("this.pasePermanente", this.pasePermanente);
    this.ingresoService.generatePDFPasePermanente(this.pasePermanente).subscribe((data: any) => {
      this.modalService.dismissAll();
      this.showPreview(data, modal);
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });

  }

  clickInputFile(item: Referencia, fileInput: any) {
    this.referencia = item;
    fileInput.click();
  }

  uploadReferencePhoto(inputFile: HTMLInputElement) {
    if (inputFile.files[0]) {
      const authToken = this.authenticationService.getCurrentUser().access_token;
      this.uo.authTokenHeader = 'Authorization';
      this.uo.authToken = `Bearer ${authToken}`;
      this.uo.additionalParameter = {
        referenciaId: this.referencia.id
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

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const exit = JSON.parse(response);
    Swal.fire({
      title: exit.error ? 'Error!' : 'Guardado',
      text: exit.mensaje,
      icon: exit.error ? 'error' : 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
      this.listReferencias(this.ingreso.id);
    });
    this.uploader.progress = 0;
    this.uploader.clearQueue();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
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

  closeModal() {
    this.modalService.dismissAll();
  }

  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
  }

  showFormModal() {
    this.isForm = true;
  }

  cancel() {
    this.isForm = false;
  }

  change($event) { }

}

class PasePermanente {
  id: number;
  tipoPase: string;
  horarioVisita: string;
  referenciaPersonal: any;
  fechaNacimiento: string;
  menores: any[];
  observaciones: string;
  numeroIdentificacion?: string;
}
