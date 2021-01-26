import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IngresoService } from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { roles } from '@shared/helpers/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toTypeScript } from '@angular/compiler';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatalogosService } from '@shared/services/catalogos.service';
import { DatePipe } from '@angular/common';
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
  public delitosData = [];
  public ingreso: any;
  public ROLE_ARCHIVO = roles.archivo.role;

  public delito: any
  public tipoDelitoLista: any[];
  public delitoUpdate: any


  public tipoProcesos: any[];
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

  constructor(private ingresoService: IngresoService, private modalService: NgbModal,
    private detector: ChangeDetectorRef, private catalogosService: CatalogosService,
    private datePipe: DatePipe
  ) {
    this.causaPenal = {} as any;
    this.delito = {} as any;
    this.delitoUpdate = {} as any;
    this.tipoDelitoLista = [];
    this.tipoProcesos = [];
    // Table
    this.getTipoDelitos();
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
  }

  ngOnInit() {
    this.getData();
    this.getTipoProceso();
  }

  getData(personaId?) {
    this.ingresoService.listCausaPenal(this.personaId ? this.personaId : personaId).subscribe((data: any) => {
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
    this.causaPenal = item;
    this.causaPenal.fechaPosibleCompurga = this.datePipe.transform(this.causaPenal.fechaPosibleCompurga, 'yyyy-MM-dd');

    this.toggleForm();
  }

  seeDelitosCausa(item: any, modal) {
    this.causaPenal = item
    this.getDelitos()

    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  seeRecursos(item, modal) {
    this.causaPenal = item;
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-primary' });
  }

  delete(item: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.ingresoService.deleteCausaPenal(item.id).subscribe((data: any) => {
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
    this.causaPenal = { ...this.causaPenal, imputado: { id: this.ingreso.id }, personaIngresada: { id: this.personaId } };
    this.ingresoService.saveCausaPenal(this.causaPenal).subscribe((data: any) => {
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

  //Delito

  search = (text$: Observable<string>) => {
    return text$.pipe(
      map(term => term === '' ? []
        : this.tipoDelitoLista.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  }
  formatter = (x: { nombre: string }) => x.nombre;

  closeModal() {
    this.modalService.dismissAll()
  }

  getTipoDelitos() {
    this.catalogosService.listDelito().subscribe((data: any) => {
      this.tipoDelitoLista = data.delitos
    })
  }


  saveDelito() {

    if (this.delito.idTipoDelito == null) {
      let tipoDelito = {
        nombre: this.delito
      }
      let delitoNuevo = {
        nombre: this.delito,
        tipoDelito: tipoDelito
      }
      this.delito = delitoNuevo;
    } else {

      this.delito.tipoDelito = {
        id: this.delito.idTipoDelito
      }
      this.delito.id = this.delitoUpdate.id
    }
    this.delito.causaPenal = {
      id: this.causaPenal.id
    }

    this.ingresoService.saveDelito(this.delito).subscribe((data: any) => {

      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.delito = {}
      this.delitoUpdate = {}
      this.getDelitos()
      this.getData()
    })

  }

  getDelitos() {
    this.ingresoService.listDelitosByCausasPenales(this.causaPenal.id).subscribe((data: any) => {
      if (data.listaDelitos) {
        this.delitosData = data.listaDelitos
      } else {
        this.delitosData = []
      }
    })
  }

  delitoEdit(delito) {

    this.delito.id = delito.id
    this.delito = delito
    this.delito.nombre = delito.tipoDelito.nombre
    this.delito.juez = delito.juez;
    this.delitoUpdate = delito
  }

  getTipoProceso() {
    this.ingresoService.getTipoProceso().subscribe((data: any) => {
      this.tipoProcesos = data.tipoProceso;
    })
  }

  change($event: Event) {
  }

  onEdit(event: any) { }
  viewHistory(modal?) { }
}
