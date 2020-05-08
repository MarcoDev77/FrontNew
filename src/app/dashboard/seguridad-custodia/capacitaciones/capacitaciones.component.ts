import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.scss']
})
export class CapacitacionesComponent implements OnInit {

  public data = [];
  public isLoading = false;
  // Table atributes
  public auxId: any;
  public isForm = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public selectedRow: number;
  public setClickedRow: (i) => void;


  constructor() {
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
  }


  // Table methods
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
    this.isForm = true;
  }

  cancel() {
    this.showTr();
    this.isForm = false;
  }

  switch(e) {
    this.p = e;
    this.cancel();
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

}

class Capacitacion {
  id: number;
  nombre: string;
}
