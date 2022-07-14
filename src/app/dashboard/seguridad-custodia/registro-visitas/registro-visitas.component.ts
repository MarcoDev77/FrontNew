import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';
import {FormArray, FormControl} from '@angular/forms';
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
  public minors = [];
  public finalMi =[];
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
    this.finalMi = [];
    this.minors =[];
    this.codigoBarras = "";
    this.referencia = {};
  }

  searchVisita() {

    this.finalMi = [];
    this.minors =[];
    this.isLoading = true;
    this.SeguridadCustodiaService.searchVisita(this.codigoBarras).subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      if (data.referencia) {
        this.referencia = data.referencia;
        this.menores = data.referencia.menores;
        //console.log(this.menores);
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

  onChangeMinor($event) {
    const data = $event.target.value;
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.minors.push(data);
    } else {
      const index = this.minors.indexOf(data);
      this.minors.splice(index, 1);
    }
    this.finalMi = this.minors.filter(this.onlyUnique);
    console.log(this.finalMi);
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  saveIngresoVisita() {
    this.isLoading = true;
    const model = {
      referenciaId: this.referencia.id,
      codigoBarras: this.codigoBarras,
      menores: this.menoresSelected,
      menoresNombres: this.finalMi,
      tipoPase: this.referencia.tipoPase
    };

    console.log(model);

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
      this.finalMi = [];
    }, () => {
      this.finalMi = [];
      this.isLoading = false;
    });
    this.finalMi = [];
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
