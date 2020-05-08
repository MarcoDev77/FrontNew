import { Component, OnInit } from '@angular/core';
import { Nombramiento } from '@shared/models/Nombramiento';

@Component({
  selector: 'app-nombramiento',
  templateUrl: './nombramiento.component.html',
  styleUrls: ['./nombramiento.component.scss']
})
export class NombramientoComponent implements OnInit {
  public nombramiento: Nombramiento;
  public nombramientos: any[];

    // Table attributes
    public p;
    public filter: any;
    public reverse = true;
    public key = 'id'; // set default
    public isForm: boolean;
    public selectedRow: Number;
    public setClickedRow: (i) => void;
    public auxId: any;
  constructor() {
    this.nombramiento= {} as any;
    this.nombramientos=[];
   }

  ngOnInit() {
    this.getData()
  }

  getData(){}

  saveNombramiento(){

  }


  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.nombramiento = {} as Nombramiento;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  add() {
    this.nombramiento = {} as Nombramiento;
    this.isForm = true;
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
