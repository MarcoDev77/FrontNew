import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() loader:boolean;

  constructor() { }

  ngOnInit() {
  }
}
