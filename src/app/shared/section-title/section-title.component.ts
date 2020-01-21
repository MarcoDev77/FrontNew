import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `
    <div class="row" style="margin-bottom: 10px; margin-top: 10px;">
      <div class="col-md-2">
        <label><i class="{{icon}} fa-2x mr-2" aria-hidden="true"></i> {{title.toLocaleUpperCase()}}</label>
      </div>
      <div class="col-md-10">
        <hr style="margin-left: 5px; width: 100%; border: 1px solid #CE9ACB; size: 5; ">
      </div>
    </div>
  `,
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {

  @Input() title: string;
  @Input() icon: string;
}
