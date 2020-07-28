import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecursoProbatorio} from '@shared/models/RecursoProbatorio';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos-probatorios',
  templateUrl: './recursos-probatorios.component.html',
  styleUrls: ['./recursos-probatorios.component.scss']
})
export class RecursosProbatoriosComponent implements OnInit {
  public recurso: RecursoProbatorio;
  @Input() causaPenal: any;
  public isForm = false;
  formGroup: FormGroup;
  public listRecursos = [];

  // Table
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isLoading: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public auxId: any;

  constructor(private formBuilder: FormBuilder, private ingresoService: IngresoService) {
    this.recurso = {} as RecursoProbatorio;
    // Table
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
    this.initForm();
  }

  getData() {
    this.ingresoService.listRecursos(this.causaPenal.id).subscribe((data: any) => {
      console.log('Recursos.getData', data);
      if (!data.error) {
        this.listRecursos = data.recursos;
      }
    });
  }

  update(item) {
    this.recurso = {...item};
    console.log('ee', this.recurso);
    this.recurso.causaPenal = null;
    this.formGroup.setValue({...this.recurso});
    this.toggleForm();
  }

  delete(item) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.deleteRecurso(item.id).subscribe((data: any) => {
          console.log('delete', data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          });
          if (!data.error) {
            this.getData();
          }
        });
      }
    });
  }

  setAgotado(item) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El recurso se marcará como agotado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.setRecursoAgotado(item.id).subscribe((data: any) => {
          console.log('agotado', data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          });
          if (!data.error) {
            this.getData();
          }
        });
      }
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      fechaRegistro: [null],
      estaAgotado: [false],
      causaPenal: [null],
      nombre: [
        '',
        [Validators.required, Validators.maxLength(80)]
      ],
      juzgadoProcedencia: [
        '',
        [Validators.required, Validators.maxLength(255)]
      ],
      penalidadAnio: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$'), Validators.max(100)]
      ],
      penalidadMes: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$'), Validators.max(11)]
      ],
      penalidadDia: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$'), Validators.max(30)],
      ],
      observaciones: ['', [Validators.required]],
      multa: ['', [Validators.required]],
      reparacion: ['', [Validators.required]],
    });
  }

  isValidControl = controlName => this.formGroup.get(controlName).invalid && this.formGroup.get(controlName).touched;

  sort(key: string) {
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

  toggleForm() {
    this.isForm = !this.isForm;
    if (!this.isForm) {
      this.resetForm();
    }
  }

  resetForm() {
    console.log('resetedform');
    this.recurso = new RecursoProbatorio();
    console.log('ddd', this.recurso);
    this.formGroup.setValue(this.recurso);
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.recurso = {...this.formGroup.value, causaPenal: {id: this.causaPenal.id}};
    this.ingresoService.saveRecurso(this.recurso).subscribe((data: any) => {
      console.log('Data', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      }).then(() => {
        this.getData();
        this.resetForm();
        this.toggleForm();
      });
    });
  }
}
