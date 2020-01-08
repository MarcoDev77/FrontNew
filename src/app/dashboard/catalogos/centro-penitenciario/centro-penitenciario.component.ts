import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centro-penitenciario',
  templateUrl: './centro-penitenciario.component.html',
  styleUrls: ['./centro-penitenciario.component.scss']
})
export class CentroPenitenciarioComponent implements OnInit {
  public loading = false;
  public item: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public data: any[];
  public areaPericial: any;
  public roles: any;

  public date;
  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  constructor() {
    this.areaPericial = {} as any;
    this.data = [];
    this.date = new Date();
    this.roles = [];

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
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
    this.isForm = true;
  }

  update(id, item) {
    this.isForm = true;
    this.areaPericial = {...item};
    this.areaPericial.role = [{value: item.role, description: item.roleNombre}];

    if (this.auxId && this.auxId !== id) {
      this.showTr();
      this.auxId = id;
    } else {
      this.auxId = id;
    }
    setTimeout(() => {
      this.hiddenTr();
      const tr = document.getElementById(this.auxId);
      const form = document.getElementById('table-form');

      tr.insertAdjacentElement('afterend', form);
    }, 50);
  }

  cancel() {
    this.showTr();
    this.isForm = false;
    this.areaPericial = {} as any;
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
