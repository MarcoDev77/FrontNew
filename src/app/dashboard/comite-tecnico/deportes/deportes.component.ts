import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.scss']
})
export class DeportesComponent implements OnInit {
  public isLoading: boolean;
  public generalidades: any;
  public informacionDeportiva: InfoDeportiva;
  // FilePreview
  public file: any;

  constructor(private comiteTecnicoService: ComiteTecnicoService, private modalService: NgbModal) {
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
    this.isLoading = true;
    console.log('info', this.informacionDeportiva);
    this.informacionDeportiva.imputado = {id: this.generalidades.imputadoId};
    this.comiteTecnicoService.saveComiteDeporte(this.informacionDeportiva).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Actualización',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
      console.log(error);
      this.isLoading = false;
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
    this.isLoading = true;
    this.comiteTecnicoService.generatePDFDeportes(this.generalidades.imputadoId).subscribe((data: any) => {
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
      this.isLoading = false;
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
