import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.scss']
})
export class OdontologiaComponent implements OnInit {
  public generalidades: any;
  public isLoading: boolean;
  public historial: HistorialClinico;

  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidades = {} as any;
    this.historial = new HistorialClinico();
  }

  ngOnInit() {
  }

  getData() {
    this.isLoading = true;
    this.comiteTecnicoService.getDataComiteOdontoligia(this.generalidades.folio).subscribe((data: any) => {
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
        if (data.imputado.listaHistorial) {
          this.historial = data.imputado.listaHistorial;
        } else {
          this.historial = new HistorialClinico();
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

  searchImputado() {
    if (this.generalidades.folio.length >= 6) {
      console.log('Entra');
      this.getData();
    }
  }

  private handleError() {
    this.isLoading = false;
    this.generalidades = {} as any;
    this.historial = new HistorialClinico();
  }

  submit() {
    console.log('dd', this.historial);
    this.historial.imputado = {id: this.generalidades.imputadoId};
    this.comiteTecnicoService.saveComiteOdontolofia(this.historial).subscribe((data: any) => {
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

class Transtorno {
  realizada = false;
  dato = '';
}

class HistorialClinico {
  id: number;
  sintomatologia = '';
  ta = '';
  fc = '';
  fr = '';
  imputado: any;
  fiebreReumatica = new Transtorno();
  enfermedadCorazon = new Transtorno();
  enfermedadRinon = new Transtorno();
  tuberculosis = new Transtorno();
  ulceras = new Transtorno();
  hepatitisIctericaHigado = new Transtorno();
  artitris = new Transtorno();
  diabetes = new Transtorno();
  desmayosConvulsiones = new Transtorno();
  alergica = new Transtorno();
  enfermedadSexual = new Transtorno();
  hipertensionHipotension = new Transtorno();
  tosPersistente = new Transtorno();
  dolorDePecho = new Transtorno();
  faltaDeAire = new Transtorno();
  respiraBoca = new Transtorno();
  sangranEncias = new Transtorno();
  rechinanDientes = new Transtorno();
  dolorOidos = new Transtorno();
  tumorBoca = new Transtorno();
  infeccionHongo = new Transtorno();
  embarazada = new Transtorno();
  psiquiatrico = new Transtorno();
  asmatico = new Transtorno();
  antecedentesEnfermedades = new Transtorno();
}
