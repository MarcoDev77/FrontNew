import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent implements OnInit {

  public ingreso: any;
  public datosDelito: any[];

  constructor(private catalogosService: CatalogosService) {
    this.ingreso = {} as any;
    this.datosDelito = [];
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
}
