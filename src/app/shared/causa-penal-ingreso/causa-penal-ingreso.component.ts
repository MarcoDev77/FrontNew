import {Component, OnInit, Input} from '@angular/core';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import {roles} from '@shared/helpers/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-causa-penal-ingreso',
  templateUrl: './causa-penal-ingreso.component.html',
  styleUrls: ['./causa-penal-ingreso.component.scss']
})
export class CausaPenalIngresoComponent implements OnInit {

  @Input() ingresoId;
  @Input() personaId;
  @Input() role;
  public causaPenal: any;
  public data = [];
  public ingreso: any;
  public ROLE_ARCHIVO = roles.archivo.role;

  // Table
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public isLoading: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public auxId: any;

  constructor(private ingresoService: IngresoService, private modalService: NgbModal) {
    this.causaPenal = {} as any;
    // Table
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
  }

  ngOnInit() {
    console.log('ID', this.ingresoId);
    this.getData();
  }

  getData() {
    this.ingresoService.listCausaPenal(this.personaId).subscribe((data: any) => {
      console.log(data);
      if (!data.error) {
        this.data = data.listaCausaPenal;
      }
    });
  }

  // Table Methods
  toggleForm() {
    this.isForm = !this.isForm;
  }

  update(item: any) {
    this.causaPenal = {...item};
    this.toggleForm();
  }

  seeDelitosCausa(item: any,modal) {
    this.causaPenal=item
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  delete(item: any) {
    console.log(item);
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.deleteCausaPenal(item.id).subscribe((data: any) => {
          console.log('deleteCausaPenal', data);
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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.causaPenal = {} as any;
  }

  submit(array?) {
    if (!this.causaPenal.nombre) {
      return;
    }
    this.causaPenal = {...this.causaPenal, imputado: {id: this.ingreso.id}, personaIngresada: { id: this.personaId}};
    this.ingresoService.saveCausaPenal(this.causaPenal).subscribe((data: any) => {
      console.log('save carpeta', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.cancel();
        this.getData();
      }
    });
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  validateFields(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
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
