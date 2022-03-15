import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-visitas',
  templateUrl: './registro-visitas.component.html'
})
export class RegistroVisitasComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public referencia: any
  public isLoading: boolean
  public codigoBarras: string
  public time = new Date();
  public timer;

  menores:menorIngreso[];
  menoresSelected: number[] = [];

  constructor(
    private SeguridadCustodiaService: SeguridadCustodiaService
  ) { }

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
        this.referencia = data.referencia;
        this.menores = data.referencia.menores;
        console.log(this.menores);
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
      menores: this.menoresSelected,
      tipoPase: this.referencia.tipoPase
    }
    this.SeguridadCustodiaService.saveIngresoVisita(model).subscribe((data: any) => {
      console.log(data);
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

// export class RegistroVisitas {
//   referenciaId?: number;

// }

export class menorIngreso {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  fechaNacimiento?: string;
  selected?: boolean;

  constructor() {
    this.selected = false;
  }
}