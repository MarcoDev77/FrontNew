import { Component, OnInit } from '@angular/core';
import { InformaticaService } from '@shared/services/informatica.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte-visitas',
  templateUrl: './reporte-visitas.component.html',
  styleUrls: ['./reporte-visitas.component.scss']
})
export class ReporteVisitasComponent implements OnInit {
  public isLoading: boolean;
  public ingreso;
  public imputado: any;
  // Filepreview
  public file: any;


  constructor(
    private informaticaService: InformaticaService,
    private modalService: NgbModal) {
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

  generatePDF(modal) {
    this.isLoading = true;
    this.informaticaService.generatePDFFormatoPdfReporteVisitaCredencial(this.ingreso.id)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.showPreview(data, modal);
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  cleanForm() {
    this.ingreso = {};
    this.imputado = {};
  }

  showPreview(data, modal) {
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
  }

}
