import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecursoProbatorio} from '@shared/models/RecursoProbatorio';
import {IngresoService} from '@shared/services/ingreso.service';

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
    this.initForm();
    // Table
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ingresoService.listRecursos(this.causaPenal.id).subscribe((data: any) => {
      console.log('Recursos.getData', data);
      if (!data.error) {
        this.listRecursos = data.recursos;
      }
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [
        this.recurso.id,
      ],
      nombre: [
        this.recurso.nombre,
        [Validators.required, Validators.maxLength(80)]
      ],
      juzgadoProcedencia: [
        this.recurso.juzgadoProcedencia,
        [Validators.required, Validators.maxLength(255)]
      ],
      penalidadAnio: [
        this.recurso.penalidadAnio,
        [Validators.min(0), Validators.pattern('^[0-9]*$')]
      ],
      penalidadMes: [
        this.recurso.penalidadMes,
        [Validators.min(0), Validators.pattern('^[0-9]*$')]
      ],
      penalidadDia: [
        this.recurso.penalidadDia,
        [Validators.min(0), Validators.pattern('^[0-9]*$')]
      ],
      observaciones: [
        this.recurso.observaciones
      ],
      multa: [
        this.recurso.multa
      ],
      reparacion: [
        this.recurso.reparación
      ],
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
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.value, this.recurso);
  }
}
