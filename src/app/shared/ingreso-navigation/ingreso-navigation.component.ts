import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ingreso-navigation',
  template: `
      <div class="col-12 text-center pb-5">
        <a *ngFor="let item of steps; let i = index;" [routerLink]="[item.path]"
           [ngClass]="{'active': i == step, 'tab-navigator': i != step}"
           class="pr-4">{{item.name}}</a>
      </div>
  `,
  styleUrls: ['./ingreso-navigation.component.scss']
})
export class IngresoNavigationComponent {
  @Input() step: string;
  public steps: any[];

  constructor() {
    this.steps = [
      {name: 'Formulario de ingreso', path: '/dashboard/ingreso/form-ingreso'},
      {name: 'Señas particulares', path: '/dashboard/ingreso/senas-particulares'},
      {name: 'Característica', path: '/dashboard/ingreso/caracteristicas'},
      {name: 'Dactiloscopia', path: '/dashboard/ingreso/dactiloscopia'},
      // {name: 'Referencias'},
      // {name: 'Situación penal'},
    ];
  }

}