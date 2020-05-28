import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-generalidades-ppl',
  templateUrl: './generalidades-ppl.component.html',
  styleUrls: ['./generalidades-ppl.component.scss']
})
export class GeneralidadesPPLComponent {
  @Input() generalidadesPPL: any;
  @Input() inputs: any[];

  constructor() { 
    console.log(this.generalidadesPPL)
  }
}
