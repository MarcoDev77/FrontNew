import {Component, OnInit} from '@angular/core';
import {Ingreso} from '@shared/models/Ingreso';

@Component({
  selector: 'app-estudio-trabajo-social',
  templateUrl: './estudio-trabajo-social.component.html',
  styleUrls: ['./estudio-trabajo-social.component.scss']
})
export class EstudioTrabajoSocialComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: Ingreso;
  public grupoFamiliar: any[];
  public familiar: any;
  public antecedente: any
  public estudio: any;

  //Table atributess
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;
  constructor() {
    this.ingreso = {} as Ingreso;
   this.grupoFamiliar=[];
   this.antecedente= {} as any
   this.estudio= {} as any;
  }

  ngOnInit() {
  }

  searchImputado() {

  }

  deleteAntecedente(item?){

  }

//Table methods
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
    this.familiar = {} as any;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  add() {
    this.familiar = {} as any;
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
