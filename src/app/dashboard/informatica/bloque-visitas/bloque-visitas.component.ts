import { Component, OnInit, Input } from '@angular/core';
import { Visitante } from '@shared/models/Visitante';

@Component({
  selector: 'app-bloque-visitas',
  templateUrl: './bloque-visitas.component.html',
  styleUrls: ['./bloque-visitas.component.scss']
})
export class BloqueVistasComponent implements OnInit {
  @Input() visitantes: Visitante[]
  constructor() {
   }

  ngOnInit() {
  }

}
