import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {Router} from '@angular/router';
import {Ingreso} from '@shared/models/Ingreso';
import {Imputado} from '@shared/models/Imputado';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';

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
  public delitos = [];
  public centrosPenitenciarios = [];

  constructor(
    private catalogosService: CatalogosService,
    private router: Router,
    private ingresoService: IngresoService
  ) {
    this.ingreso = {} as any;
    this.datoDelito = {} as DatoDelito;
    this.alias = {} as Alias;
    this.ingreso = {} as Ingreso;
    this.ingreso.imputado = {} as Imputado;

    const ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    if (ingreso) {
      this.ingreso = ingreso;
    }
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
    this.catalogosService.listCentroPenitenciario()
      .subscribe((data: any) => this.centrosPenitenciarios = this.mapToSelect(data.centros));
    this.catalogosService.listDelito()
      .subscribe((data: any) => this.delitos = this.mapToSelect(data.delitos));
  }

  getEstado() {
    if (this.ingreso.imputado.paisNacimientoSelect) {
      this.catalogosService.listEstados('seleccionada', this.ingreso.imputado.paisNacimientoSelect.value)
        .subscribe((data: any) => this.estados = this.mapToSelect(data.estados));
    }
  }

  getMunicipios() {
    if (this.ingreso.imputado.estadoSelect) {
      this.catalogosService.listMunicipios('seleccionada', this.ingreso.imputado.estadoSelect.value)
        .subscribe((data: any) => this.municipios = this.mapToSelect(data.estados));
    }
  }

  getIngreso(id) {
    this.ingresoService.getIngreso(id).subscribe((data: any) => {
      console.log('new ingreso', data);
      const {ingreso, error} = data;
      ingreso.imputado.gradoEstudioSelect = {
        value: ingreso.imputado.gradoEstudio.id,
        description: ingreso.imputado.gradoEstudio.nombre
      };
      ingreso.imputado.ocupacionSelect = {
        value: ingreso.imputado.ocupacion.id,
        description: ingreso.imputado.ocupacion.nombre
      };
      ingreso.imputado.estadoCivilSelect = {
        value: ingreso.imputado.estadoCivil.id,
        description: ingreso.imputado.estadoCivil.nombre
      };
      ingreso.imputado.paisNacimientoSelect = {
        value: ingreso.imputado.paisNacimiento.id,
        description: ingreso.imputado.paisNacimiento.nombre
      };
      ingreso.imputado.religionSelect = {
        value: ingreso.imputado.religion.id,
        description: ingreso.imputado.religion.nombre
      };
      ingreso.imputado.municipioSelect = {
        value: ingreso.imputado.municipio.id,
        description: ingreso.imputado.municipio.nombre
      };
      ingreso.imputado.estadoSelect = {
        value: ingreso.imputado.municipio.estado.id,
        description: ingreso.imputado.municipio.estado.nombre
      };
      this.ingreso = ingreso;
      this.arrayAlias = ingreso.imputado.apodos;
      this.arrayDatoDelito = ingreso.imputado.delitos;
    });
  }

  submit() {
    console.log('submit', this.ingreso);
    this.ingreso.imputado.edadAparente = Number(this.ingreso.imputado.edadAparente);
    this.ingreso.imputado.hablaIndigena = this.ingreso.imputado.hablaIndigena ? this.ingreso.imputado.hablaIndigena : false;
    this.ingreso.imputado.esIndigena = this.ingreso.imputado.esIndigena ? this.ingreso.imputado.esIndigena : false;
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

  addDatoDelito(array) {
    // TODO: Arreglar que desaparecen las opciones del select
    if (this.validateFiels(array) && this.datoDelito.delitoSelect && this.arrayDatoDelito.length <= 10) {
      // this.arrayDatoDelito = [...this.arrayDatoDelito, this.datoDelito];
      this.arrayDatoDelito.push(this.datoDelito);
      this.datoDelito = {} as DatoDelito;
      console.log(this.delitos);
    }
  }

  deleteDatoDelito(item) {
    this.arrayDatoDelito = this.arrayDatoDelito.filter(dato => dato !== item);
  }

  addAlias(array) {
    if (this.validateFiels(array) && this.arrayAlias.length <= 5) {
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
          this.alias.id = data.idRegistro;
          this.arrayAlias = [...this.arrayAlias, this.alias];
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
        item.principal = true;
      }
    });
  }

  deleteAlias(item) {
    if (!item.esPrincipal) {
      this.arrayAlias = this.arrayAlias.filter(alias => alias !== item);
    }
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

  mapProperties(propertie: any) {
    const id = propertie.value;
    return {id};
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
    }
    this.router.navigate(['/dashboard/ingreso/media-afiliacion']);
  }
}

class DatoDelito {
  id?: number;
  delito: string;
  delitoSelect: any;
  fechaDetencion: Date;
  fechaRegistro: Date;
  causaPenal: string;
  carpeta: string;
}

class Alias {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  alias: string;
  principal: boolean;
  imputado?: any;
}
