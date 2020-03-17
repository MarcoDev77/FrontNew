import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {Router} from '@angular/router';
import {Ingreso} from '@shared/models/Ingreso';
import {Imputado} from '@shared/models/Imputado';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent implements OnInit {

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
    // this.catalogosService.listGradoEstudio()
    //   .subscribe((data: any) => this.gradosdeEstudio = this.mapToSelect(data.gradosEstudio));
    this.catalogosService.listReligiones()
      .subscribe((data: any) => this.religiones = this.mapToSelect(data.religiones));
    this.catalogosService.listEstadosCiviles()
      .subscribe((data: any) => this.estadosCiviles = this.mapToSelect(data.estadosCiviles));
    // this.catalogosService.listOcupaciones()
    //   .subscribe((data: any) => this.ocupaciones = this.mapToSelect(data.ocupaciones));
    this.catalogosService.listPaises()
      .subscribe((data: any) => this.paises = this.mapToSelect(data.paises, true));
    // this.catalogosService.listCentroPenitenciario()
    //   .subscribe((data: any) => this.centrosPenitenciarios = this.mapToSelect(data.centros));
    this.catalogosService.listDelito()
      .subscribe((data: any) => this.delitos = this.mapToSelect(data.delitos));
    this.getEstado();
  }

  getEstado() {
    this.catalogosService.listEstados('mexico', null)
      .subscribe((data: any) => {
        console.log('ESTADOS', data);
        this.estadosDimicilio = this.mapToSelect(data.estados);
      });
  }

  getEstadoNacimiento() {
    if (this.ingreso.imputado.paisNacimientoSelect) {
      console.log('Estado domicilio', this.ingreso.imputado.paisNacimientoSelect);
      this.estados = [];
      this.catalogosService.listEstados('seleccionada', this.ingreso.imputado.paisNacimientoSelect.value)
        .subscribe((data: any) => this.estados = this.mapToSelect(data.estados));
    }
  }

  getMunicipios() {
    if (this.ingreso.imputado.estadoDomicilioSelect) {
      console.log(this.ingreso.imputado.estadoDomicilioSelect);
      this.municipios = [];
      this.catalogosService.listMunicipios('seleccionada', this.ingreso.imputado.estadoDomicilioSelect.value)
        .subscribe((data: any) => this.municipios = this.mapToSelect(data.estados));
    }
  }

  getIngreso(id) {
    this.ingresoService.getIngreso(id).subscribe((data: any) => {
      console.log('new ingreso', data);
      const {ingreso, error} = data;
      console.log('GET ingreso', ingreso);
      if (!ingreso.registroNuevo) {
        ingreso.imputado.estadoCivilSelect = {
          value: ingreso.imputado.estadoCivil.id,
          description: ingreso.imputado.estadoCivil.nombre
        };
        ingreso.imputado.paisNacimientoSelect = {
          value: ingreso.imputado.paisNacimiento.id,
          description: ingreso.imputado.paisNacimiento.nacionalidad
        };
        ingreso.imputado.religionSelect = {
          value: ingreso.imputado.religion.id,
          description: ingreso.imputado.religion.nombre
        };
        ingreso.imputado.municipioSelect = {
          value: ingreso.imputado.municipio.id,
          description: ingreso.imputado.municipio.nombre
        };
        ingreso.imputado.estadoNacimientoSelect = {
          value: ingreso.imputado.estadoNacimiento.id,
          description: ingreso.imputado.estadoNacimiento.nombre
        };
        ingreso.imputado.estadoDomicilioSelect = {
          value: ingreso.imputado.municipio.estadoDomicilio.id,
          description: ingreso.imputado.municipio.estadoDomicilio.nombre
        };
        this.ingreso = ingreso;
        this.arrayAlias = ingreso.imputado.apodos;
        this.arrayDatoDelito = ingreso.imputado.delitos;
        this.ingreso.imputado.fechaNacimiento = this.datePipe.transform(this.ingreso.imputado.fechaNacimiento, 'yyyy-MM-dd');
      } else {
        this.ingreso.id = ingreso.id;
        this.ingreso.folio = ingreso.folio;
        this.ingreso.numeroExpediente = ingreso.numeroExpediente;
        this.arrayAlias = ingreso.imputado.apodos;
      }
      this.ingreso.registroTerminado = ingreso.registroTerminado;
    });
  }

  submit() {
    if (!this.validSelect()) {
      return Swal.fire({
        title: 'Cuidado',
        text: 'Se deben llenar los campos de <<Religion>>, <<Nacionalidad>>, <<Estado civil>>, <<Ocupación>>, <<Grado de estudios>>' +
          '<<Estado>> y <<Municipio>>',
        icon: 'warning',
      });
    }
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

  validSelect(): boolean {
    return !!(this.ingreso.imputado.religionSelect && this.ingreso.imputado.paisNacimientoSelect && this.ingreso.imputado.estadoDomicilioSelect
    && this.ingreso.imputado.estadoCivilSelect && this.ingreso.imputado.estadoDomicilioSelect, this.ingreso.imputado.municipioSelect);
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

  mapToSelect(array: any[], isPaises?) {
    if (isPaises) {
      return array.map((item: any) => ({value: item.id, description: item.nacionalidad}));
    }
    return array.map((item: any) => ({value: item.id, description: item.nombre}));
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
