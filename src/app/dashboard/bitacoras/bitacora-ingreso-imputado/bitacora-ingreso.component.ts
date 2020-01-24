import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bitacora-ingreso',
  templateUrl: './bitacora-ingreso.component.html',
  styleUrls: ['./bitacora-ingreso.component.scss']
})
export class BitacoraIngresoImputadoComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  add(modal) {
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }
}
