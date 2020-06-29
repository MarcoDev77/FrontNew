import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { EstudioTrabajoSocial } from '@shared/models/EstudioTrabajoSocial';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estudio-trabajo-social',
  templateUrl: './estudio-trabajo-social.component.html',
  styleUrls: ['./estudio-trabajo-social.component.scss']
})
export class EstudioTrabajoSocialComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  public estudio: EstudioTrabajoSocial;
  public nucleoId: number;
  public parentescos: any[];
  // Filepreview
  public file: any;


  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
    this.parentescos = [];
    this.ingreso = {} as Ingreso;
    this.estudio = {} as EstudioTrabajoSocial;
    this.estudio.parentesco = {};
    this.estudio.parentescoResponsable = {}
  }

  ngOnInit() {
    this.getParentescos();
  }

  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      console.log('Data', data);
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
          this.estudio.parentescoResponsable = {}
        }
        this.getClasificacion();
      } else {
        this.ingreso = {} as Ingreso;
        this.estudio = {} as EstudioTrabajoSocial;
        this.estudio.parentesco = {};
      }
    }, error => {
      this.isLoading = false;
      this.ingreso = {} as Ingreso;
      this.estudio = {} as EstudioTrabajoSocial;
      this.estudio.parentesco = {};
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
    this.estudio = {} as EstudioTrabajoSocial;
    this.estudio.parentesco = {};
    this.estudio.parentescoResponsable = {}
  }

  getParentescos() {
    this.servicioSocialService.getParentescos()
      .subscribe((data: any) => this.parentescos = data.parentescos);
  }

  getClasificacion() {
    console.log('To server getClasificacion', this.ingreso.folio);

    this.servicioSocialService.getEstudioClasificion(this.ingreso.folio).subscribe((data: any) => {
      console.log('Clasificacion', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Búsqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.estudio = data.imputado.estudioClasificacion;
        this.estudio.parentescoResponsable = data.imputado.estudioClasificacion.parentescoResponsable || {};
        this.nucleoId = data.imputado.nucleoFamiliar;
      }
    });
  }
  submit() {
    this.isLoading = true;
    console.log('To server', this.estudio);
    this.estudio.imputado = { id: this.ingreso.imputado.id };
    this.servicioSocialService.saveEstudioClasificacion(this.estudio).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  genetatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFEstudioClasificacion(this.ingreso.imputado.id)
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
