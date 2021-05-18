import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import Swal from 'sweetalert2';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Imputado } from '@shared/models/Imputado';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';

@Component({
  selector: 'app-invitacion-actividad',
  templateUrl: './invitacion-actividad.component.html',
  styleUrls: ['./invitacion-actividad.component.scss']
})
export class InvitacionActividadComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  public invitacion: Invitacion;
  public file: any

  constructor(
    private servicioSocialService: ServicioSocialService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalService: NgbModal
  ) {
    this.isLoading = false
    this.ingreso = {} as any
    this.invitacion = {} as any;
  }

  ngOnInit() {
  }


  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Búsqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
        if (!data.imputado.parentescoResponsable) {
        }
      } else {
        this.ingreso = {} as Ingreso;
      }
    }, error => {
      this.isLoading = false;
      this.ingreso = {} as Ingreso;
      Swal.fire({
        title: 'Error!',
        text: 'Error al realizar la búsqueda',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  cleanForm() {
    this.isLoading = false;
    this.ingreso = {} as Ingreso;
  }



  genetatePDF(modal) {
    this.isLoading = true;
    this.invitacion.imputado = {
      id: this.ingreso.id
    }
    this.comiteTecnicoService.generatePDFInvitacionTaller(this.invitacion)
      .subscribe((data: any) => {
        this.showPreview(data, modal);
      })
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

class Invitacion {
  taller: String
  horario: String
  duracion: String
  lugar: String
  inicia: String
  imputado: any
}
