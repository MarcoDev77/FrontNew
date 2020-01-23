import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dactiloscopia',
  templateUrl: './dactiloscopia.component.html',
  styleUrls: ['./dactiloscopia.component.scss']
})
export class DactiloscopiaComponent implements OnInit {

  public isLoadingImages: boolean;
  public isLoadingDactiloscopia: boolean;
  public uriNoImage: string;
  public iconLoading: string;

  constructor() {
    this.isLoadingImages = true;
    this.uriNoImage = 'no_image';
    this.isLoadingDactiloscopia = true;
    this.iconLoading = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
  }

  ngOnInit() {
  }

  showImages = () => {
    setTimeout(() => {
      this.isLoadingImages = false;
    }, 700);
  };

  showDatiloscopia = () => {
    setTimeout(() => {
      this.isLoadingDactiloscopia = false;
    }, 700);
  };

}