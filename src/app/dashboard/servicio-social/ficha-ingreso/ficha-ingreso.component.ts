import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ficha-ingreso',
  templateUrl: './ficha-ingreso.component.html',
  styleUrls: ['./ficha-ingreso.component.scss']
})
export class FichaIngresoComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: any;
  public ficha: any
  public file: any
  constructor(private servicioSocialService: ServicioSocialService, private modalService: NgbModal) {
    this.ingreso = {} as any;
    this.ficha = {} as any;
  }

  ngOnInit() {
  }

  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true
    this.servicioSocialService.getInfoFichaIngreso(this.ingreso.folio).subscribe((data: any) => {
      console.log(data)
      this.ingreso = data.imputado
      this.ficha = data.imputado.fichaIngreso
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.isLoading = false
    })
  };

  cleanForm() {
    this.ingreso = {} as any;
    this.ficha = {} as any;
  }

  saveFicha() {
    this.ficha.imputado = {
      id: this.ingreso.imputadoId
    }

    console.log(this.ficha)
    this.servicioSocialService.saveFichaIngreso(this.ficha).subscribe((data: any) => {
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }


  genetatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFFichaIngresoTrabajoSocialV2(this.ingreso.imputadoId).subscribe((data: any) => {
      console.log('preview', data);
      this.isLoading = false;
      this.showPreview(data, modal);
    }, error => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'error al generar el documento',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      console.log(error);

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
