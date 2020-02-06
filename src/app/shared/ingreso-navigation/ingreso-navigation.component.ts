import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ingreso-navigation',
  template: `
      <div class="col-12 text-center">
          <div class="btn-group btn-group-md bg main-container" role="group">
            <a *ngFor="let item of steps; let i = index;" [routerLink]="[item.path]"
               [ngClass]="{'active-nav': i == step}"
               class="btn bg">{{item.name}}</a>
          </div>
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
      {name: 'Señas particulares', path: '/dashboard/ingreso/media-afiliacion'},
      {name: 'Característica', path: '/dashboard/ingreso/caracteristicas'},
      {name: 'Dactiloscopia', path: '/dashboard/ingreso/dactiloscopia'},
      // {name: 'Referencias'},
      // {name: 'Situación penal'},
    ];
  }

}
