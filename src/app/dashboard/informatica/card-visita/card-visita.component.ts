import { Component, OnInit, Input } from '@angular/core';
import { Visitante } from '@shared/models/Visitante';

@Component({
  selector: 'app-card-visita',
  templateUrl: './card-visita.component.html',
  styleUrls: ['./card-visita.component.scss']
})
export class CardVisitaComponent implements OnInit {
  @Input() visitante: Visitante;
    
  constructor() {
   }

  ngOnInit() {
     
  }

}
