import { Component, OnInit } from '@angular/core';
import { JuridicoService } from '@shared/services/juridico.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-busqueda-ingreso',
  templateUrl: './busqueda-ingreso.component.html',
  styleUrls: ['./busqueda-ingreso.component.scss']
})
export class BusquedaIngresoComponent implements OnInit {
  public isLoading: boolean;
  public ingreso;
  public imputado: any;
  public bajaInterno: any;
  public observacionImputado: any;
  public p: any;
  public causaPenal: any;
  constructor(
    private juridicoService: JuridicoService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe) {
    this.cleanForm();
    this.bajaInterno = {} as any;
    this.observacionImputado = {} as any;
    this.causaPenal = {} as any;
  }

  ngOnInit() {
  }
  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    console.log( this.ingreso )

    this.isLoading = true;
    this.juridicoService.getImputado(ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      if (!data.error) {
        this.imputado = data.imputado;
      } else {
        this.cleanForm();
      }
    });
  }

  editInfo(ingreso: any) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/form-ingreso`]);
  }
  cleanForm() {
    this.ingreso = {};
    this.imputado = {};
    this.bajaInterno = {};
  }
  showModal(modal) {
    this.bajaInterno.fechaEgreso =this.datePipe.transform(this.imputado.datosJuridicosImputado.fechaEgreso,'yyyy-MM-dd');
    this.bajaInterno.horaEgreso =this.datePipe.transform(this.imputado.datosJuridicosImputado.fechaEgreso,'HH:mm'); 
    this.bajaInterno.imputadoId = this.imputado.id
    this.bajaInterno.id = this.imputado.datosJuridicosImputado.id


    this.bajaInterno.tipoLibertad = this.imputado.datosJuridicosImputado.tipoLibertad
    this.bajaInterno.juzgado = this.imputado.datosJuridicosImputado.juzgado
    this.bajaInterno.nombreJuez = this.imputado.datosJuridicosImputado.nombreJuez
    this.bajaInterno.proceso = this.imputado.datosJuridicosImputado.proceso
    this.bajaInterno.observacion = this.imputado.datosJuridicosImputado.observacion
     

    console.log(this.bajaInterno)
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }


  submit() {
    console.log(this.bajaInterno)
     this.juridicoService.saveBaja(this.bajaInterno).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.modalService.dismissAll();
        this.searchImputado(this.ingreso);
      }
    });
  }

  registrarObservacion() {
    this.observacionImputado.imputadoId = this.imputado.id
    this.observacionImputado.observacion = this.imputado.observacion

     this.juridicoService.registrarObservacion(this.observacionImputado).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.searchImputado(this.ingreso);
      }
    });
  }

  seeRecursos(item, modal) {
    this.causaPenal = item;
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-primary' });
  }
}
