import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent implements OnInit {

  public ingreso: any;
  public datoDelito: DatoDelito;
  public arrayDatoDelito: DatoDelito[];
  public alias: Alias;
  public arrayAlias: Alias[];

  constructor(private catalogosService: CatalogosService) {
    this.ingreso = {} as any;
    this.datoDelito = {} as DatoDelito;
    this.arrayDatoDelito = [];
    this.alias = {} as Alias;
    this.arrayAlias = [];
  }

  ngOnInit() {
    this.getCatalogos();
  }

  getCatalogos() {
    this.catalogosService.listGradoEstudio().subscribe((data: any) => console.log('ESTUDIOS', data));
    this.catalogosService.listReligiones().subscribe((data: any) => console.log('religiones', data));
    this.catalogosService.listEstadosCiviles().subscribe((data: any) => console.log('listEstadosCiviles', data));
    this.catalogosService.listOcupaciones().subscribe((data: any) => console.log('listOcupaciones', data));
  }

  submit() {
    console.log('submit');
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
