import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {Router} from '@angular/router';
import {Ingreso} from '@shared/models/Ingreso';
import {Imputado} from '@shared/models/Imputado';

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
  public municipios = [];

  constructor(private catalogosService: CatalogosService, private router: Router) {
    this.ingreso = {} as any;
    this.datoDelito = {} as DatoDelito;
    this.alias = {} as Alias;
    this.ingreso = {} as Ingreso;
    this.ingreso.imputado = {} as Imputado;
  }

  ngOnInit() {
    this.getCatalogos();
  }

  getCatalogos() {
    this.catalogosService.listGradoEstudio()
      .subscribe((data: any) => this.gradosdeEstudio = this.mapToSelect(data.gradosEstudio));
    this.catalogosService.listReligiones()
      .subscribe((data: any) => this.religiones = this.mapToSelect(data.religiones));
    this.catalogosService.listEstadosCiviles()
      .subscribe((data: any) => this.estadosCiviles = this.mapToSelect(data.estadosCiviles));
    this.catalogosService.listOcupaciones()
      .subscribe((data: any) => this.ocupaciones = this.mapToSelect(data.ocupaciones));
    this.catalogosService.listPaises()
      .subscribe((data: any) => this.paises = this.mapToSelect(data.paises));
  }

  getEstado() {
    if (this.ingreso.imputado.paisNacimiento) {
      this.catalogosService.listEstados('seleccionada', this.ingreso.imputado.paisNacimiento.value)
        .subscribe((data: any) => this.estados = this.mapToSelect(data.estados));
    }
  }

  getMunicipios() {
    if (this.ingreso.imputado.estado) {
      this.catalogosService.listMunicipios('seleccionada', this.ingreso.imputado.estado.value)
        .subscribe((data: any) => this.municipios = this.mapToSelect(data.estados));
    }
  }

  submit() {
    console.log('submit', this.ingreso);
    // this.ingre
    // this.router.navigate(['/dashboard/ingreso/dactiloscopia']);
  }

  addDatoDelito(array) {
    if (this.validateFiels(array)) {
      this.arrayDatoDelito = [...this.arrayDatoDelito, this.datoDelito];
      this.datoDelito = {} as DatoDelito;
    }
  }

  deleteDatoDelito(item) {
    this.arrayDatoDelito = this.arrayDatoDelito.filter(dato => dato !== item);
  }

  addAlias(array) {
    if (this.validateFiels(array)) {
      this.arrayAlias = [...this.arrayAlias, this.alias];
      this.alias = {} as Alias;
    }
  }

  deleteAlias(item) {
    this.arrayAlias = this.arrayAlias.filter(alias => alias !== item);
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

  mapToSelect(array: any[]) {
    return array.map((item: any) => ({value: item.id, description: item.nombre}));
  }
}

class DatoDelito {
  id?: number;
  delito: string;
  fechaDetencion: Date;
  fechaRegistro: Date;
}

class Alias {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  alias: string;
}
