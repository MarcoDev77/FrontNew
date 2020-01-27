import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-web-viewer',
  template: `
    <app-image-viewer [downloadTooltipLabel]="'Descargar'" [resetZoomTooltipLabel]="'Restablecer zoom'"
                      [rotateLeftTooltipLabel]="'Girar a la izquierda'" [rotateRightTooltipLabel]="'Girar a la derecha'" [images]="[file]"
                      [defaultDownloadName]="name" [showPDFOnlyOption]="false" [fullscreen]="false" [primaryColor]="'transparent'"
                      [className]="'minHeigh'" [idContainer]="'idOnHTML'" [loadOnInit]="true"></app-image-viewer>
  `,
  styleUrls: ['./web-viewer.component.scss']
})
export class WebViewerComponent implements OnInit {
  @Input() file: any;
  @Input() name: any;

  constructor() {
  }

  ngOnInit() {
  }

}
