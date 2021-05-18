import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '@shared/models/Ingreso';
import { Router } from '@angular/router';
import { IngresoService } from '@shared/services/ingreso.service';
import { Imputado } from '@shared/models/Imputado';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-situacion-penal',
  templateUrl: './situacion-juridica-ingreso.component.html',
  styleUrls: ['./situacion-juridica-ingreso.component.scss']
})
export class SituacionJuridicaComponent implements OnInit {
  public ingreso: any

  constructor(private router: Router, private modalService: NgbModal, private ingresoService: IngresoService) {
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
  }

  ngOnInit() {
  }



  submit() {
    let model = {
      imputadoId: this.ingreso.id,
      esTraslado: this.ingreso.esTraslado,
      centroOrigen: this.ingreso.centroOrigen,
      dormitorio: this.ingreso.dormitorio
    }
    this.ingresoService.editTraslado(model).subscribe((data: any) => {
      if (!data.error) {
        sessionStorage.setItem('ingreso', JSON.stringify(this.ingreso));

      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {

      }
    });
  }
  viewHistory(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  delitoEdit(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  goTo(uri: string, ingreso: Ingreso) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  add() { }
  switch($event) { }
}

