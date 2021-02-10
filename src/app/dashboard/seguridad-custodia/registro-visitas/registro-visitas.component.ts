import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-visitas',
  templateUrl: './registro-visitas.component.html',
  styleUrls: ['./registro-visitas.component.scss']
})
export class RegistroVisitasComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public referencia: any
  public isLoading: boolean
  public codigoBarras: String
  public time = new Date();
  public timer;

  constructor(private SeguridadCustodiaService: SeguridadCustodiaService) { }

  ngOnInit() {
    this.referencia = {} as any
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  resetData() {
    this.codigoBarras = "";
    this.referencia = {};
  }

  searchVisita() {
    this.isLoading = true;
    this.SeguridadCustodiaService.searchVisita(this.codigoBarras).subscribe((data: any) => {
      this.isLoading = false;
      if (data.referencia) {
        this.referencia = data.referencia
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Encontrado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    }, () => {
      this.isLoading = false;
    })
  }

  saveIngresoVisita() {
    this.isLoading = true;
    let model = {
      referenciaId: this.referencia.id,
      codigoBarras: this.codigoBarras,
      numeroNinos: this.referencia.numeroNinos,
      tipoPase: this.referencia.tipoPase
    }
    this.SeguridadCustodiaService.saveIngresoVisita(model).subscribe((data: any) => {
      this.isLoading = false;
      if (!data.error) {
        this.resetData();
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        showConfirmButton: true
      });
    }, () => {
      this.isLoading = false;
    })
  }

  saveSalidaVisita() {
    this.isLoading = true;
    let model = {
      id: this.referencia.id,
      codigoBarras: this.codigoBarras,
    }
    this.SeguridadCustodiaService.saveSalidaVisita(model).subscribe((data: any) => {
      this.isLoading = false;
      if (!data.error) {
        this.resetData();
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        showConfirmButton: true
      });
    }, () => {
      this.isLoading = false;
    })
  }


}
