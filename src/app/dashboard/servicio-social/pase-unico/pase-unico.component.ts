import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pase-unico',
  templateUrl: './pase-unico.component.html',
  styleUrls: ['./pase-unico.component.scss']
})
export class PaseUnicoComponent implements OnInit {
  public isMenores: boolean
  constructor() { 
    this.isMenores=false
  }

  ngOnInit() {
  }
  

}
