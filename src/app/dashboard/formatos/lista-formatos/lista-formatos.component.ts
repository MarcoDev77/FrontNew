import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lista-formatos',
  templateUrl: './lista-formatos.component.html',
  styleUrls: ['./lista-formatos.component.scss']
})
export class ListaFormatosComponent implements OnInit {

  public AllFormats: any;

  constructor() {
    this.AllFormats = [
      {name: 'Formato de coordinación general de la unidad de reinserción', path: '/dashboard/formatos/general'},
      {name: 'Forma número 1', path: '/dashboard/formatos/forma-1'},
    ];
  }

  ngOnInit() {
  }

}
