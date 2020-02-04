import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '@shared/models/Ingreso';
import { Router } from '@angular/router';
@Component({
  selector: 'app-situacion-juridica-imputado',
  templateUrl: './situacion-juridica-imputado.component.html',
  styleUrls: ['./situacion-juridica-imputado.component.scss']
})
export class SituacionJuridicaImputadoComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
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
}
