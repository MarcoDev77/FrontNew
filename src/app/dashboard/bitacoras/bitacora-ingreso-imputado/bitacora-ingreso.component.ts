import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '@shared/services/bitacora.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bitacora-ingreso',
  templateUrl: './bitacora-ingreso.component.html',
  styleUrls: ['./bitacora-ingreso.component.scss']
})
export class BitacoraIngresoImputadoComponent implements OnInit {

  public data: any = [];
  public isLoading = false;
  public ingreso: any;
  public max: number;
  public offset: number;
  // Table Attributes
  public key: any;
  public reverse: any;
  public filter: any;
  public p: any;

  constructor(
    private modalService: NgbModal,
    private bitacoraService: BitacoraService,
    private router: Router
  ) {
    this.max = 20;
    this.offset = 0;
    this.ingreso = {} as any;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.bitacoraService.listBitacoraIngresoImputado(this.max, this.offset).subscribe((data: any) => {
      this.data = data.ingresos;
    });
  }

  nextPage() {
    this.offset += this.max;
    this.getData();
  }

  previousPage() {
    this.offset -= this.max;
    this.getData();
  }

  add(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  openSearchModal(modal) {
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-primary mt-12' });
  }

  seeDetails(item) {
    this.ingreso = item;
  }

  goToFormularioIngreso() {
    sessionStorage.setItem('ingreso', JSON.stringify(this.ingreso));
    this.modalService.dismissAll();
    this.router.navigate([`dashboard/ingreso/form-ingreso`]);
  }
}
