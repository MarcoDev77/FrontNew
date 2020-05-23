import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { EstudioTrabajoSocial } from '@shared/models/EstudioTrabajoSocial';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudio-trabajo-social',
  templateUrl: './estudio-trabajo-social.component.html',
  styleUrls: ['./estudio-trabajo-social.component.scss']
})
export class EstudioTrabajoSocialComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  public estudio: EstudioTrabajoSocial;
  public parentescos: any[];


  constructor(private servicioSocialService: ServicioSocialService) {
    this.parentescos = [];
    this.ingreso = {} as Ingreso;
    this.estudio = {} as EstudioTrabajoSocial;
    this.estudio.parentesco = {};
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
  }

  getParentescos() {
    this.servicioSocialService.getParentescos()
      .subscribe((data: any) => this.parentescos = data.parentescos);
  }

  getClasificacion() {
    console.log('To server getClasificacion', this.ingreso.folio);

    this.servicioSocialService.getEstudioClasificion(this.ingreso.folio).subscribe((data: any) => {
      console.log('Clasificacion', data);
      if (!data.error) {
        this.estudio = data.imputado.estudioSocioeconomico;
        this.estudio.parentesco = data.imputado.estudioSocioeconomico.parentescoResponsable;
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

}
