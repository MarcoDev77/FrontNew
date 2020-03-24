import {Component, OnInit} from '@angular/core';
import {IngresoService} from '@shared/services/ingreso.service';

@Component({
  selector: 'app-busqueda-huellas-detalle',
  templateUrl: './busqueda-huellas-detalle.component.html',
  styleUrls: ['./busqueda-huellas-detalle.component.scss']
})
export class BusquedaHuellasDetalleComponent implements OnInit {

  public resultado: any;
  public isLoading: boolean;
  public areMore: boolean;
  public list: any;
  public max = 1;
  public offset = 0;

  constructor(private ingresoService: IngresoService) {
    this.list = {} as any;
    this.resultado = JSON.parse(localStorage.getItem('resultado'));
  }

  ngOnInit() {
    console.log('resultado', this.resultado);
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.ingresoService.listHuellasPersona(this.resultado.id, this.offset, this.max).subscribe((data: any) => {
      console.log('huellas', data);
      this.isLoading = false;
      if (!data.error) {
        this.list = data.ingresos[0];
        this.areMore = data.existenRegistros;
      }
    });
  }

  nextPage() {
    this.offset += 1;
    this.getData();
  }

  previousPage() {
    this.offset -= 1;
    this.getData();
  }

}
