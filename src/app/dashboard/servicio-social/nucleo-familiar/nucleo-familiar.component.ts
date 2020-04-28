import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { NucleoFamiliar } from '@shared/models/NucleoFamiliar';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { CatalogosService } from '@shared/services/catalogos.service';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.scss']
})
export class NucleoFamiliarComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public nucleo: NucleoFamiliar;
  public imputado: any;
  public parentescos = [];
  public estados = [];

  constructor(
    private servicioSocialService: ServicioSocialService,
    private catalogoService: CatalogosService) {
    this.ingreso = {} as Ingreso;
    this.imputado = {} as any;
    this.nucleo = new NucleoFamiliar();
    this.nucleo.parentescoAvalMoral = {} as any;
    this.nucleo.parentescoVivira = {} as any;
    this.nucleo.estadoVivira = {} as any;
  }

  ngOnInit() {
    this.getParentescos();
    this.getEstados();
  }

  searchImputado() {
    this.isLoading = true;
    this.servicioSocialService.getInfoNucleoFamiliar(this.ingreso.folio).subscribe((data: any) => {
      console.log('data', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.imputado = data.nucleoFamiliar.imputado;
        this.nucleo = data.nucleoFamiliar;
      } else {
        this.handleErrorSearch();
      }
    }, this.handleErrorSearch);
  }

  handleErrorSearch(error?) {
    if (error) {
      console.log(error);
    }
    Swal.fire({
      title: 'Error!',
      text: 'Consulta fallida',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false
    });
    this.isLoading = false;
    this.ingreso = {} as Ingreso;
    this.imputado = {} as any;
    this.nucleo = new NucleoFamiliar();
    this.nucleo.parentescoAvalMoral = {} as any;
    this.nucleo.parentescoVivira = {} as any;
    this.nucleo.estadoVivira = {} as any;
  }

  submit() {
    console.log('submit', this.nucleo);
    this.servicioSocialService.saveNucleoFamiliar(this.nucleo).subscribe((data: any) => {
      console.log('Response', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  getEstados() {
    this.catalogoService.listEstados('mexico', null).subscribe((data: any) => {
      this.estados = data.estados;
    });
  }

  getParentescos() {
    this.catalogoService.getParentescos().subscribe((data: any) => {
      this.parentescos = data.parentescos;
    });
  }

}
