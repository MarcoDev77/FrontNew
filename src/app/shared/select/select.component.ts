import {Component, Input, Output, SimpleChanges} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select',
  template: `<ngx-select-dropdown container="body" [disabled]="disabled" [ngClass]="isEmpty" [class]="class" name="roles" [config]="dropdownSettings" [options]="options" [(ngModel)]="modelo" (ngModelChange)="changeModel()"
                         [multiple]="multiple"></ngx-select-dropdown>
  `,
})
export class SelectComponent {
  @Output() getModel = new EventEmitter();
  @Input() search;
  @Input() limite;
  @Input() multiple;
  @Input() options;
  @Input() modelo;
  @Input() class;
  @Input() disabled;
  @Input() placeholder;


  public dropdownSettings = {
    displayKey: 'description',
    search: true,
    height: '300px',
    placeholder: 'Seleccione...',
    moreText: 'más',
    noResultsFound: 'No se han encontrado resultados',
    searchPlaceholder: 'Buscar',
    searchOnKey: 'description',
    limitTo: this.limite ? this.limite : 100,
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'placeholder') {
        if (changes[property].currentValue) {
          this.dropdownSettings.placeholder = changes[property].currentValue;
        }
      }

      if (property === 'search') {
        this.dropdownSettings.search = changes[property].currentValue;
      }
    }
  }

  changeModel() {
    if(this.modelo && this.modelo.length == 0){
      this.modelo = undefined
    }

    this.getModel.emit(this.modelo);
  }

  get isEmpty() {
    return this.modelo == '' || this.modelo == undefined ? 'placehorder':'';
  }

}
