import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BitacoraService} from '@shared/services/bitacora.service';

@Component({
  selector: 'app-bitacora-ingreso',
  templateUrl: './bitacora-ingreso.component.html',
  styleUrls: ['./bitacora-ingreso.component.scss']
})
export class BitacoraIngresoComponent implements OnInit {

  public data: any = [];
  public key: any;
  public reverse: any;
  public filter: any;
  public p: any;
  public isLoading = false;
  constructor(
    private modalService: NgbModal,
    private bitacoraService: BitacoraService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
      this.bitacoraService.listBitacoraIngreso().subscribe((data: any) => {
        console.log('getData', data);
        this.data = data.ingresos;
      });
  }

  add(modal) {
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }
}
