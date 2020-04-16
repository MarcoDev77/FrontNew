import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.scss']
})
export class OdontologiaComponent implements OnInit {
  public generalidades: any;
  public isLoading: boolean;
  public historial: HistorialClinico;
  // FilePreview
  public file: any;

  constructor(private comiteTecnicoService: ComiteTecnicoService, private modalService: NgbModal) {
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

  generatePDF(modal) {
    console.log('generatePDF');
    this.comiteTecnicoService.generatePDFOdontologia(this.generalidades.imputadoId).subscribe((data: any) => {
      console.log('PDF', data);
      this.isLoading = false;
      const file = new Blob([data], {type: 'application/*'});
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = ev => this.isLoading = true;
      reader.onloadend = () => {
        this.isLoading = false;
        let dataUrl: any;
        dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1];
        this.modalService.dismissAll();
        if (base64) {
          this.file = base64;
          this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary'});
        }
      };
      reader.onerror = () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Error al generar el archivo',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
        this.modalService.dismissAll();
      };
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
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
