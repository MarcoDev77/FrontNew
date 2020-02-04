import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingreso } from '@shared/models/Ingreso';
import { IngresoService } from '@shared/services/ingreso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-ingreso',
  templateUrl: './lista-ingreso.component.html',
  styleUrls: ['./lista-ingreso.component.scss']
})
export class ListaIngresoComponent implements OnInit {
  public data: Ingreso[];
  public isLoading = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  public selectedRow: number;
  public setClickedRow: Function;

  constructor(private router: Router, private ingresoService: IngresoService, private modalService: NgbModal) {
    this.data = [];

    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data = [
      {
        id: 1,
        folio: '6546848EE',
        numeroExpediente: 'NUM1',
        categoria: 'PrimoDelicinente',
        tipoIngreso: 'Primo Delincuente',
        imputado: null,
        numeroControRenip: null,
        tipoImputado: 'Ingreso'
      },{
        id: 2,
        folio: '6546848EE',
        numeroExpediente: 'NUM1',
        categoria: 'PrimoDelicinente',
        tipoIngreso: 'Primo Delincuente',
        imputado: null,
        numeroControRenip: null,
        tipoImputado: 'Imputado'
      }
    ];
  }

  switch(e) {
    this.p = e;
  }

  sort(key) {
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

  add() {
    this.router.navigate(['/dashboard/ingreso/form-ingreso']);

  }
  search(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  goTo(uri: string, ingreso: Ingreso) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }
}
