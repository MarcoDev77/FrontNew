import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bitacora-imputado-liberacion',
  templateUrl: './bitacora-imputado-liberacion.component.html',
  styleUrls: ['./bitacora-imputado-liberacion.component.scss']
})
export class BitacoraImputadoLiberacionComponent implements OnInit {

  public data: any[] = [];
  public isLoading: boolean;

  public auxId: any;
  public isForm = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public selectedRow: Number;
  public setClickedRow: Function;
  isDetails: boolean;

  constructor(
    private modalService: NgbModal,
  ) {

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    // TODO: el setTmeOutQuitar
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
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

  add(modal) {
    // this.isDetails = false;
    // this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }

  switch(e) {
    this.p = e;
  }

  submit() {
    console.log('>(');
  }

  seeDetails(item, modal) {
    this.isDetails = true;
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }

}
