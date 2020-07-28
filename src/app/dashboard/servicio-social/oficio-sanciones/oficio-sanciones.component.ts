import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { OficioSanciones } from '@shared/models/OficioSanciones';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-oficio-sanciones',
  templateUrl: './oficio-sanciones.component.html',
  styleUrls: ['./oficio-sanciones.component.scss']
})
export class OficioSancionesComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public oficio: OficioSanciones;
  public file: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;
    this.oficio = {} as OficioSanciones;
  }

  ngOnInit() {
  }

  searchImputado(imputado) {
    if (imputado) {
      this.ingreso = { ...imputado };
    }
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      console.log('Data', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
        this.getOficioSanciones();
      } else {
        this.cleanForm();
      }
    }, error => {
      this.cleanForm();
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Error al realizar la busqueda',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  cleanForm() {
    this.isLoading = false;
    this.ingreso = {} as Ingreso;
    this.oficio = {} as OficioSanciones;
  }

  getOficioSanciones() {
    this.isLoading = true;
    this.servicioSocialService.getOficioSanciones(this.ingreso.imputado.id).subscribe((data: any) => {
      this.isLoading = false;
      if (!data.error) {
        this.oficio = data.imputado.oficioDirector;
      }
    });
  }

  submit() {
    this.isLoading = true;
    this.oficio.imputado = { id: this.ingreso.imputado.id };
    console.log('To server', this.oficio);
    this.servicioSocialService.saveOficioSanciones(this.oficio).subscribe((data: any) => {
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

  generatePDF(modal) {
    this.isLoading = true;
    console.log('imputadoId', this.ingreso.imputado.id);

    this.servicioSocialService.generatePDFOficioDirectorGeneral(this.ingreso.imputado.id)
      .subscribe((data: any) => {
        this.isLoading = false;
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

}
