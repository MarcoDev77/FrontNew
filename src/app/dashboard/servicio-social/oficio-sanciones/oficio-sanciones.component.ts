import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { OficioSanciones } from '@shared/models/OficioSanciones';

@Component({
  selector: 'app-oficio-sanciones',
  templateUrl: './oficio-sanciones.component.html',
  styleUrls: ['./oficio-sanciones.component.scss']
})
export class OficioSancionesComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public oficio: OficioSanciones;

  constructor(private servicioSocialService: ServicioSocialService) {
    this.ingreso = {} as Ingreso;
    this.oficio = {} as OficioSanciones;
  }

  ngOnInit() {
  }

  searchImputado() {
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
        this.ingreso = {} as Ingreso;
        this.oficio = {} as OficioSanciones;
      }
    }, error => {
      this.isLoading = false;
      this.ingreso = {} as Ingreso;
      this.oficio = {} as OficioSanciones;
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

}
