import { Component, OnInit } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { Ingreso } from '@shared/models/Ingreso';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { Visita } from '@shared/models/Visita';
import { Referencia } from '@shared/models/Referencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-visita',
  templateUrl: './registro-visita.component.html',
  styleUrls: ['./registro-visita.component.scss']
})
export class RegistroVisitaComponent implements OnInit {

  public ingreso: Ingreso;
  public isLoading: boolean;
  public visitas: Visita[];
  public visita: Visita;
  public referencias: Referencia[];
  // Table atributes
  public auxId: any;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  // File preview
  public file: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
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
        this.getVisitas();
        this.getReferencias();
      } else {
        this.cleanForm();
      }
    }, error => {
      console.log(error);
      this.cleanForm();
    });
  }

  cleanForm() {
    this.ingreso = {} as Ingreso;
    this.visitas = [];
    this.referencias = [];
  }

  getVisitas() {
    this.servicioSocialService.getVisitas(this.ingreso.imputado.id).subscribe((data: any) => {
      console.log('visitas', data);
      this.visitas = data.visitas;
    });
  }

  getReferencias() {
    this.servicioSocialService.listRefencias(this.ingreso.imputado.id).subscribe((data: any) => {
      console.log('referemcias', data);
      if (data.error) {
        this.referencias = [];
        return;
      }
      this.referencias = data.referenciasPersonales;
    });
  }

  saveVisita() {
    this.isLoading = true;
    this.visita.numeroInfantes = Number(this.visita.numeroInfantes);
    console.log('To server', this.visita);
    this.servicioSocialService.saveVisitas(this.visita).subscribe((data: any) => {
      console.log('submit', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.modalService.dismissAll();
        console.log('this', this);

        this.getVisitas();
      }
    });
  }

  setHoraSalida(visitaId) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.servicioSocialService.marcarHoraSalidaVisita(visitaId).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getVisitas();
            }
          });
        });
      }
    });
  }

  generateReciboPertenencias(visitaId, modal) {
    this.servicioSocialService.generatePDFFormatoPertenencias(visitaId).subscribe((data: any) => {
      this.showPreview(data, modal);
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

  openModal(modal, visita?: Visita) {
    if (visita) {
      this.visita = { ...visita };
    } else {
      this.visita = {} as Visita;
      this.visita.referenciaPersonal = {};
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  // Table methods
  switch = e => this.p = e;

  sort(key) {
    if (key === this.key) {
      this.reverse = !this.reverse;
      if (this.reverse === false) {
        this.key = 'id';
        this.reverse = true;
      }
    } else {
      this.key = key;
      this.reverse = false;
    }
  }

}
