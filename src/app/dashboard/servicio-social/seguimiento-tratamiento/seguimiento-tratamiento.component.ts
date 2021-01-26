import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguimiento-tratamiento',
  templateUrl: './seguimiento-tratamiento.component.html',
  styleUrls: ['./seguimiento-tratamiento.component.scss']
})
export class SeguimientoTratamientoComponent implements OnInit {
  public ingreso: Ingreso;
  public isLoading: boolean;
  // File preview
  public file: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal
  ) {
    this.cleanForm();
  }

  ngOnInit() {
  }

  searchImputado(ingreso) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
      } else {
        this.cleanForm();
      }
    }, error => {
      this.cleanForm();
    });
  }

  cleanForm() {
    this.ingreso = {} as Ingreso;
  }

  generatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFSeguimientoTratamiento(this.ingreso.imputado.id).subscribe((data: any) => {
      this.isLoading = false;
      this.showPreview(data, modal);
    }, error => {
      this.isLoading = false;
    });
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
