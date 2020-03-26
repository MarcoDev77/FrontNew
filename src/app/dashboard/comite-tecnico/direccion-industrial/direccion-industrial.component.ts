import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direccion-industrial',
  templateUrl: './direccion-industrial.component.html',
  styleUrls: ['./direccion-industrial.component.scss']
})
export class DireccionIndustrialComponent implements OnInit {
  public data=[]
  public isLoading: boolean
  constructor() {
    this.isLoading=false
   }

  ngOnInit() {
  }
  switch($event){}
}
