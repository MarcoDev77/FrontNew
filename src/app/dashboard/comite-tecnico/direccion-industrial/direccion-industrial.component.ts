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
        this.generalidadesPPL = data.imputado[0];
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
    });
  }

  switch($event) {
  }

  searchImputado() {
    if (this.generalidadesPPL.folio.length >= 6) {
      console.log('Entra');
      this.getData();
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
  observaciones: string;
  horario: string;
}

class ListaActividades {
  artesanias: Actividad;
  bolasHiloMacrame: Actividad;
  bolsasPlastico: Actividad;
  calado: Actividad;
  carpinteria: Actividad;
  cocina: Actividad;
  huaracheria: Actividad;
  imprenta: Actividad;
  mosaico: Actividad;
  panaderia: Actividad;
  papiroflexia: Actividad;
  pinturaTextil: Actividad;
  piteado: Actividad;
  repujado: Actividad;
  servicios: Actividad;
  tallado: Actividad;
  tallerCubrebocas: Actividad;
  tallerTokal: Actividad;
  tienda: Actividad;
  otras: Actividad;
}
