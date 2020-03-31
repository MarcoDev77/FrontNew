import {Component, OnInit} from '@angular/core';
import {ComiteTecnicoService} from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direccion-industrial',
  templateUrl: './direccion-industrial.component.html',
  styleUrls: ['./direccion-industrial.component.scss']
})
export class DireccionIndustrialComponent implements OnInit {
  public listExperienciaLaboral = [];
  public isLoading: boolean;
  public generalidadesPPL: GeneralidadesPPL;
  public actividades: ListaActividades;
  public experiencia: ExperienciaLaboral;
  // Table attributes
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;

  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.isLoading = false;
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ListaActividades();
    this.experiencia = {} as ExperienciaLaboral;
  }

  ngOnInit() {
  }

  getData(showMessage = true) {
    this.isLoading = true;
    this.comiteTecnicoService.getImputadoByFolio(this.generalidadesPPL.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log('data', data);
      if (showMessage) {
        Swal.fire({
          title: data.error ? 'Error!' : 'Busqueda',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }

      if (!data.error) {
        this.generalidadesPPL = data.imputado;
        const imputado = {id: this.generalidadesPPL.imputadoId};

        if (data.imputado.listaActividades) {
          this.parceListaActividades(data.imputado.listaActividades);
          this.actividades = {imputado, ...data.imputado.listaActividades};
        } else {
          this.actividades = new ListaActividades();
          this.actividades = {imputado, ...this.actividades};
        }
        // Agregando datos al arreglo de experiencia loboral
        if (data.imputado.experienciaLaboral) {
          this.listExperienciaLaboral = data.imputado.experienciaLaboral;
        }
      } else {
        this.handleError();
      }
    }, error => {
      console.log(error);
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Consulta fallida',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      this.handleError();
    });
  }

  handleError() {
    this.isLoading = false;
    this.generalidadesPPL = {} as GeneralidadesPPL;
    this.actividades = new ListaActividades();
  }

  searchImputado() {
    if (this.generalidadesPPL.folio.length >= 6) {
      console.log('Entra');
      this.getData();
    }
  }

  submit() {
    console.log('Lista Actividades', this.actividades);
    this.comiteTecnicoService.savePlandeActividades(this.actividades).subscribe((data: any) => {
      console.log('savePlandeActividades', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Actualización',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Actualización fallida',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  parceListaActividades(list) {
    if (list) {
      for (const key of Object.keys(list)) {
        if (key === 'trabajoactual' || key === 'queRealiza' || key === 'porQueNo') {
          continue;
        }
        list[key] = JSON.parse(list[key]);
      }
    }
  }

  saveExperienciaLaboral(array: any[]) {
    if (this.validateFiels(array)) {
      this.experiencia.imputado = {id: this.generalidadesPPL.imputadoId};
      console.log('To server', this.experiencia);
      this.comiteTecnicoService.saveExperienciaLaboral(this.experiencia).subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.getData(false);
          this.isForm = false;
        }
      });
    }
  }

  deleteExpeienciaLaboral(item) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.comiteTecnicoService.deleteExperienciaLaboral(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.cancel();
              this.getData(false);
            }
          });
        });
      }
    });
  }

  // Table methods

  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
  }

  updateExperienciaLaboral(id, item) {
    this.isForm = true;
    this.experiencia = {...item};

    if (this.auxId && this.auxId !== id) {
      this.showTr();
      this.auxId = id;
    } else {
      this.auxId = id;
    }
    setTimeout(() => {
      this.hiddenTr();
      const tr = document.getElementById(this.auxId);
      const form = document.getElementById('table-form');

      tr.insertAdjacentElement('afterend', form);
    }, 50);
  }

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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.experiencia = {} as ExperienciaLaboral;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  add() {
    this.experiencia = {} as ExperienciaLaboral;
    this.isForm = true;
  }

  showTr() {
    if (this.auxId) {
      const tr = document.getElementById(this.auxId);
      const array: any = tr.childNodes;

      if (array) {
        for (const td of array) {
          td.style.display = 'table-cell';
        }
        this.auxId = '';
      }
    }
  }

  hiddenTr() {
    const tr = document.getElementById(this.auxId);
    const array: any = tr.childNodes;

    if (array) {
      for (const td of array) {
        td.style.display = 'none';
      }
    }
  }
}

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: any;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
}

class Actividad {
  realizada = false;
  observaciones = '';
  horario = '';
}

class ListaActividades {
  id: number;
  trabajoactual: string;
  queRealiza: string;
  porQueNo: string;
  artesanias = {} as Actividad;
  bolasHiloMacrame = {} as Actividad;
  bolsasPlastico = {} as Actividad;
  calado = {} as Actividad;
  carpinteria = {} as Actividad;
  cocina = {} as Actividad;
  huaracheria = {} as Actividad;
  imprenta = {} as Actividad;
  mosaico = {} as Actividad;
  panaderia = {} as Actividad;
  papiroflexia = {} as Actividad;
  pinturaTextil = {} as Actividad;
  piteado = {} as Actividad;
  repujado = {} as Actividad;
  servicios = {} as Actividad;
  tallado = {} as Actividad;
  tallerCubrebocas = {} as Actividad;
  tallerTokal = {} as Actividad;
  tienda = {} as Actividad;
  otras = {} as Actividad;
  imputado: any;
}

class ExperienciaLaboral {
  id: number;
  trabajoRealizado: string;
  tiempo: string;
  motivoSeparacion: string;
  imputado: any;
}
