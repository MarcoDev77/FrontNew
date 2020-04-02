import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.scss']
})
export class DeportesComponent implements OnInit {
  public isLoading: boolean;
  public generalidades: any;
  public informacionDeportiva: InfoDeportiva;

  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidades = {} as any;
    this.informacionDeportiva = new InfoDeportiva();
  }

  ngOnInit() {
  }

  searchImputado() {
    if (this.generalidades.folio.length >= 6) {
      console.log('Entra');
      this.getData();
    }
  }

  getData() {
    this.isLoading = true;
    this.comiteTecnicoService.getComiteDeportes(this.generalidades.folio).subscribe((data: any) => {
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
        this.generalidades = data.imputado;
        if (data.imputado.objetoInformacionDeportiva) {
          this.informacionDeportiva = data.imputado.objetoInformacionDeportiva;
        } else {
          this.informacionDeportiva = new InfoDeportiva();
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
    this.generalidades = {} as any;
    this.informacionDeportiva = new InfoDeportiva();
  }

  submit() {
    console.log('info', this.informacionDeportiva);
    this.informacionDeportiva.imputado = {id: this.generalidades.imputadoId};
    this.comiteTecnicoService.saveComiteDeporte(this.informacionDeportiva).subscribe((data: any) => {
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
}

class InfoDeportiva {
  id: number;
  antecedentesFamiliaresDeportivos = '';
  lesionesEnfermedades = '';
  antecedentesHeredo = '';
  cronogramaPreescolar = '';
  cronogramaPrimaria = '';
  cronogramaSecundaria = '';
  cronogramaPreparatoria = '';
  cronogramaProfesional = '';
  logrosDeportivos = '';
  practicaDeportivaRecreativo = '';
  imputado: any;

}
