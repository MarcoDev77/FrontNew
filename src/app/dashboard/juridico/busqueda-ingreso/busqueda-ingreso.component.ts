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
  constructor(
    private juridicoService: JuridicoService,
    private router: Router,
    private modalService: NgbModal,
    private datePipe: DatePipe) {
    this.cleanForm();
    this.bajaInterno = {} as any;
    this.observacionImputado = {} as any;
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
  showModal(modal,item) {
    //this.bajaInterno.fechaLibertad ={ ... this.bajaInterno.fechaLibertad, fechaRegistro: new Date(this.oldRegister.fechaRegistro) }; item.datosJuridicosImputado.fechaLibertad
    this.bajaInterno.id = item.datosJuridicosDelito.id
    this.bajaInterno.fechaEgreso =  this.datePipe.transform( item.datosJuridicosDelito.fechaEgreso, 'yyyy-MM-dd');
    this.bajaInterno.horaEgreso = this.datePipe.transform( item.datosJuridicosDelito.fechaEgreso,'HH:mm');


    this.bajaInterno.tipoLibertad = item.datosJuridicosDelito.tipoLibertad
    this.bajaInterno.juzgado = item.datosJuridicosDelito.juzgado
    this.bajaInterno.nombreJuez = item.datosJuridicosDelito.nombreJuez
    this.bajaInterno.proceso = item.datosJuridicosDelito.proceso
    this.bajaInterno.observacion = item.datosJuridicosDelito.observacion
    this.bajaInterno.delitoId = item.id

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
}
