import {Component, Input} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section-title',
  template: `
    <div class="row mb-10" style="margin-bottom: 10px; margin-top: 10px;">
      <div *ngIf="goBack" class="col-md-{{goBack ? '1' : '2'}}">
        <i class="fa fa-arrow-left" ngbTooltip="Atrás" (click)="comeBack()"></i>
      </div>
      <div class="col-md-2">
        <label><i class="{{icon}} fa-2x mr-2" aria-hidden="true"></i> {{title.toLocaleUpperCase()}}</label>
      </div>
      <div class="col-md-{{goBack ? '9' : '10'}}">
        <hr style="margin-left: 5px; width: 100%; border: 1px solid #CE9ACB; size: 5; ">
      </div>
    </div>
  `,
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() goBack?: boolean;

  constructor( private location: Location ) {}

  public comeBack() {
    this.location.back();
  }
}
