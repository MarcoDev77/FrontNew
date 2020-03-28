import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direccion-industrial',
  templateUrl: './direccion-industrial.component.html',
  styleUrls: ['./direccion-industrial.component.scss']
})
export class DireccionIndustrialComponent implements OnInit {
  public data = [];
  public isLoading: boolean;
  public generalidadesPPL: GeneralidadesPPL;
  public actividades: ListaActividades;

  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.isLoading = false;
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ListaActividades();
    console.log(this.actividades);
  }

  ngOnInit() {
  }

  getData() {
    this.isLoading = true;
    this.comiteTecnicoService.getImputadoByFolio(this.generalidadesPPL.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log('data', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.generalidadesPPL = data.imputado;
        const imputado = {id: this.generalidadesPPL.imputadoId};

        if (data.imputado.listaActividades) {
          this.parceListaActividades(data.imputado.listaActividades);
          this.actividades = {imputado, ...data.imputado.listaActividades};
        } else {
          this.actividades = new ListaActividades();
          this.actividades = {imputado, ...this.actividades};
        }

        console.log('ddd', this.actividades);
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
    this.actividades = new ListaActividades();
  }

  switch($event) {
  }

  searchImputado() {
    if (this.generalidadesPPL.folio.length >= 6) {
      console.log('Entra');
      this.getData();
    }
  }

  submit() {
    console.log('Lista Actividades', this.actividades);
    this.comiteTecnicoService.savePlandeActividades(this.actividades).subscribe((data: any) => {
      console.log('savePlandeActividades', data);
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

  parceListaActividades(list) {
    if (list) {
      for (const key of Object.keys(list)) {
        if (key === 'trabajoactual' || key === 'queRealiza' || key === 'porQueNo') {
          continue;
        }
        list[key] = JSON.parse(list[key]);
      }
    }
  }
}

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: any;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
}

class Actividad {
  realizada = false;
  observaciones = '';
  horario = '';
}

class ListaActividades {
  id: number;
  trabajoactual: string;
  queRealiza: string;
  porQueNo: string;
  artesanias = {} as Actividad;
  bolasHiloMacrame = {} as Actividad;
  bolsasPlastico = {} as Actividad;
  calado = {} as Actividad;
  carpinteria = {} as Actividad;
  cocina = {} as Actividad;
  huaracheria = {} as Actividad;
  imprenta = {} as Actividad;
  mosaico = {} as Actividad;
  panaderia = {} as Actividad;
  papiroflexia = {} as Actividad;
  pinturaTextil = {} as Actividad;
  piteado = {} as Actividad;
  repujado = {} as Actividad;
  servicios = {} as Actividad;
  tallado = {} as Actividad;
  tallerCubrebocas = {} as Actividad;
  tallerTokal = {} as Actividad;
  tienda = {} as Actividad;
  otras = {} as Actividad;
  imputado: any;
}
