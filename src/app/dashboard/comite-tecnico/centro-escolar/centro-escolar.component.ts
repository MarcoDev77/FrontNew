import { Component, OnInit } from '@angular/core';
import { GeneralidadesPPL } from '@shared/models/GeneralidadesPPL';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-centro-escolar',
  templateUrl: './centro-escolar.component.html',
  styleUrls: ['./centro-escolar.component.scss']
})
export class CentroEscolarComponent implements OnInit {
  public isLoading: boolean;
  public generalidadesPPL: GeneralidadesPPL;
  public actividades: ActividadesEscolares;
  // FilePreview
  public file: any;

  constructor(private comiteTecnicoService: ComiteTecnicoService, private modalService: NgbModal) {
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ActividadesEscolares();
  }

  ngOnInit() {
  }

  searchImputado() {
    if (this.generalidadesPPL.folio.length >= 6) {
      this.getData();
    }
  }

  submit() {
    this.isLoading = true;
    this.actividades.imputado = { id: this.generalidadesPPL.imputadoId };
    this.comiteTecnicoService.saveActividadesEscolares(this.actividades).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Actualización',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
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

  getData() {
    this.isLoading = true;
    this.comiteTecnicoService.getDataCentroEscolarbyFolio(this.generalidadesPPL.folio).subscribe((data: any) => {
      this.isLoading = false;
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

  generatePDF(modal) {
    this.isLoading = true;
    this.comiteTecnicoService.generatePDFCentroEscolar(this.generalidadesPPL.imputadoId).subscribe((data: any) => {
      this.isLoading = false;
      const file = new Blob([data], { type: 'application/*' });
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
          this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
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
