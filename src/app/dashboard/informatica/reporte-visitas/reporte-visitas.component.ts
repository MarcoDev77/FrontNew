import { Component, OnInit } from '@angular/core';
import { InformaticaService } from '@shared/services/informatica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-visitas',
  templateUrl: './reporte-visitas.component.html',
  styleUrls: ['./reporte-visitas.component.scss']
})
export class ReporteVisitasComponent implements OnInit {
  public isLoading: boolean;
  public ingreso;
  public imputado: any;


  constructor(private informaticaService: InformaticaService) {
    this.cleanForm();
  }

  ngOnInit() {
  }

  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true;
    this.informaticaService.getVisitasImputado(ingreso.id).subscribe((data: any) => {
      console.log('searchImputado', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Búsqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.imputado = data.imputado;
      } else {
        this.cleanForm();
      }
    });
  }

  cleanForm() {
    this.ingreso = {};
    this.imputado = {};
  }

}
