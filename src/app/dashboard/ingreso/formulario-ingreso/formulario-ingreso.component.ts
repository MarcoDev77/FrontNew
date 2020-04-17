import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {Router} from '@angular/router';
import {Ingreso} from '@shared/models/Ingreso';
import {Imputado} from '@shared/models/Imputado';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {catchError, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})

export class FormularioIngresoComponent implements OnInit {
  public model: any;
  public ingreso: Ingreso;
  public datoDelito: DatoDelito;
  public arrayDatoDelito: DatoDelito[] = [];
  public alias: Alias;
  public arrayAlias: Alias[] = [];
  public gradosdeEstudio = [];
  public religiones = [];
  public estadosCiviles = [];
  public ocupaciones = [];
  public paises = [];
  public estados = [];
  public estadosDimicilio = [];
  public municipios = [];
  public delitos = [];
  public centrosPenitenciarios = [];
  public arrayToFilter = [];
  public searching = false;
  public searchFailed = false;

  constructor(
    private catalogosService: CatalogosService,
    private router: Router,
    private modalService: NgbModal,
    private ingresoService: IngresoService,
    private datePipe: DatePipe
  ) {
    this.datoDelito = {} as DatoDelito;
    this.alias = {} as Alias;
    this.ingreso = {} as Ingreso;
    this.ingreso.imputado = {} as Imputado;

    const ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    if (ingreso) {
      this.getIngreso(ingreso.id);
    }
  }

  ngOnInit() {
    this.getCatalogos();
  }


  getCatalogos() {
    this.catalogosService.listReligiones()
      .subscribe((data: any) => this.religiones = data.religiones);
    this.catalogosService.listEstadosCiviles()
      .subscribe((data: any) => this.estadosCiviles = data.estadosCiviles);
    this.catalogosService.listPaises()
      .subscribe((data: any) => this.paises = data.paises);
    this.catalogosService.listDelito()
      .subscribe((data: any) => this.delitos = data.delitos);
    this.getEstado();
  }


  getEstado() {
    this.catalogosService.listEstados('mexico', null)
      .subscribe((data: any) => {
        console.log('ESTADOS', data);
        this.estados = data.estados;
      });
  }


  getIngreso(id) {
    this.ingresoService.getIngreso(id).subscribe((data: any) => {
      console.log('new ingreso', data);
      const {ingreso, error} = data;
      console.log('GET ingreso', ingreso);
      if (!ingreso.registroNuevo) {
        this.ingreso = ingreso;
        this.arrayAlias = ingreso.imputado.apodos;
        this.arrayDatoDelito = ingreso.imputado.delitos;
        this.ingreso.imputado.fechaNacimiento = this.datePipe.transform(this.ingreso.imputado.fechaNacimiento, 'yyyy-MM-dd');
      } else {
        this.ingreso = ingreso;
        this.arrayAlias = ingreso.imputado.apodos;
      }
      this.ingreso.registroTerminado = ingreso.registroTerminado;
    });
  }

  submit() {
    console.log('submit', this.ingreso);
    this.ingreso.imputado = {...this.ingreso.imputado, fechaNacimiento: new Date(this.ingreso.imputado.fechaNacimiento)};
    this.ingreso.imputado.edadAparente = Number(this.ingreso.imputado.edadAparente);
    this.ingreso.imputado.hablaIndigena = !!this.ingreso.imputado.hablaIndigena;
    this.ingreso.imputado.esIndigena = !!this.ingreso.imputado.esIndigena;
    this.ingresoService.saveIngreso(this.ingreso).subscribe((data: any) => {
      console.log('saveIngreso', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.getIngreso(data.idRegistro);
      }
    });
  }

  addAlias(array) {
    if (this.validateFiels(array)) {
      this.alias.imputado = {id: this.ingreso.id};
      this.ingresoService.saveApodo(this.alias).subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.getIngreso(this.ingreso.id);
        }
      });
    }
  }

  setPrincialAlias(item) {
    this.ingresoService.seleccionarApodoPrincipal(item.id).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        for (const apodo of this.arrayAlias) {
          apodo.principal = false;
        }
        item.principal = true;
      }
    });
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
  
  checkMainAlias(): boolean {
    for (const item of this.arrayAlias) {
      if (item.principal) {
        return true;
      }
    }
  }

  goToSenasParticulares() {
    if (this.ingreso.id && this.arrayAlias.length > 0 && this.checkMainAlias()) {
      sessionStorage.setItem('ingreso', JSON.stringify(this.ingreso));
      this.router.navigate(['/dashboard/ingreso/dactiloscopia']);
    } else {
      Swal.fire({
        title: 'Cuidado',
        text: 'Se debe completar el registro, marcar como principal un nombre',
        icon: 'warning',
      });
    }
  }

  change($event: Event) {
    console.log('event', $event);
  }

  openCatalogo(modal) {
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12', backdrop: 'static'}).result.then(() => {
      this.getCatalogos();
    });
  }

  selectArrayTofilter(array) {
    this.arrayToFilter = array;
    console.log('Array To filter', this.arrayToFilter);
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      map(term => term === '' ? []
        : this.arrayToFilter.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  };
  formatter = (x: { nombre: string }) => x.nombre;

  searchNacionalidad = (text$: Observable<string>) => {
    return text$.pipe(
      map(term => term === '' ? []
        : this.arrayToFilter.filter(v => v.nacionalidad.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  };
  formatterNacionalidad = (x: { nacionalidad: string }) => x.nacionalidad;
}

class DatoDelito {
  id?: number;
  fechaDetencion: Date;
  fechaRegistro: Date;
  causaPenal: string;
  carpetaInvestigacion: string;
  tipoDelito: any;
  tipoDelitoSelect: any;
  imputado: any;
  delito: string;
}

class Alias {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  otro: string;
  principal: boolean;
  imputado?: any;
}
