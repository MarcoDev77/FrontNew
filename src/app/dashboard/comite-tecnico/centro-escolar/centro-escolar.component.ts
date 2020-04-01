import {Component, OnInit} from '@angular/core';
import {GeneralidadesPPL} from '@shared/models/GeneralidadesPPL';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centro-escolar',
  templateUrl: './centro-escolar.component.html',
  styleUrls: ['./centro-escolar.component.scss']
})
export class CentroEscolarComponent implements OnInit {
  public isLoading: boolean;
  public generalidadesPPL: GeneralidadesPPL;
  public actividades: ActividadesEscolares;

  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ActividadesEscolares();
  }

  ngOnInit() {
  }

  searchImputado() {
    if (this.generalidadesPPL.folio.length >= 6) {
      console.log('Entra');
      this.getData();
    }
  }

  submit() {
    this.actividades.imputado = {id: this.generalidadesPPL.imputadoId};
    console.log('actividades', this.actividades);
    this.comiteTecnicoService.saveActividadesEscolares(this.actividades).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Actualización',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Actualización fallida',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  getData() {
    this.isLoading = true;
    this.comiteTecnicoService.getDataCentroEscolarbyFolio(this.generalidadesPPL.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log('DATA', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.generalidadesPPL = data.imputado;
        if (data.imputado.listaActividades) {
          this.actividades = data.imputado.listaActividades;
        } else {
          this.actividades = new ActividadesEscolares();
        }
      } else {
        this.handleError();
      }
    }, error => {
      console.log(error);
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Consulta fallida',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      this.handleError();
    });
  }

  handleError() {
    this.isLoading = false;
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ActividadesEscolares();
  }
}

class ActividadEscolar {
  hora = '';
  dia = '';
}

class ActividadesEscolares {
  id: number;
  imputado: any;
  alfabetizacion = {} as ActividadEscolar;
  primaria = {} as ActividadEscolar;
  secundaria = {} as ActividadEscolar;
  preparatoria = {} as ActividadEscolar;
  honoresBandera = {} as ActividadEscolar;
  biblioteca = {} as ActividadEscolar;
  curso = {} as ActividadEscolar;
  grupoReligioso = {} as ActividadEscolar;
  actividadExtracurricular = {} as ActividadEscolar;
  observaciones = '';
}
