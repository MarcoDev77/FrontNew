import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-otros-oficios',
  templateUrl: './otros-oficios.component.html',
  styleUrls: ['./otros-oficios.component.scss']
})
export class OtrosOficiosComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public formats = [];
  // File preview
  public file: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;
    this.formats = [
      {
        name: 'Oficio que emite el director general de sanciones',
        image: 'oficio-director-general.png',
        methodToGenerate: (view) => this.generateOficioDirectorGeneral(view),

      },
      {
        name: 'Prevención y readaptación social (Oficio)',
        image: 'prevencion-readaptacion-social.png',
        methodToGenerate: (view) => this.generatePrevencionReadaptacion(view),
      }
    ];
  }

  ngOnInit() {
  }

  searchImputado() {
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log('data', data);
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
        this.ingreso = {} as Ingreso;
      }
    });
  }

  generatePrevencionReadaptacion(modal) {
    this.servicioSocialService.generatePDFPrevencionReadaptacion(this.ingreso.imputado.id)
      .subscribe((data: any) => {
        this.showPreview(data, modal)
      });
  }

  generateOficioDirectorGeneral(modal) {
    console.log('Se genera otro');
    this.servicioSocialService.generatePDFOficioDirectorGeneral(this.ingreso.imputado.id)
      .subscribe((data: any) => {
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
