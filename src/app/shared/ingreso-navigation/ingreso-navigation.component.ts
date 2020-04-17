import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingreso-navigation',
  template: `
    <div class="col-12 text-center">
      <div class="btn-group btn-group-md bg main-container" role="group">
        <a [routerLink]="['../lista-ingreso']" ngbTooltip="Lista de ingresos" class="btn bg">
          <i class="fa fa-list"></i>
        </a>
        <a *ngFor="let item of steps; let i = index;" [routerLink]="[item.path]"
           [ngClass]="{'active-nav': i == step, 'disabled': !freeMenu }"
           class="btn bg">{{item.name}}</a>
      </div>
    </div>
  `,
  styleUrls: ['./ingreso-navigation.component.scss']
})
export class IngresoNavigationComponent implements OnInit {
  @Input() step: string;
  @Input() freeMenu: boolean;
  public steps: any[];

  constructor() {

    this.steps = [
      {name: 'Formulario de ingreso', path: '/dashboard/ingreso/form-ingreso'},
      {name: 'Dactiloscopia', path: '/dashboard/ingreso/dactiloscopia'},
      {name: 'Características', path: '/dashboard/ingreso/caracteristicas'},
      {name: 'Señas particulares', path: '/dashboard/ingreso/media-afiliacion'},

      // {name: 'Referencias'},
      // {name: 'Situación penal'},
    ];
  }

  ngOnInit(): void {
    console.log('FREEMENU', this.freeMenu);
  }

}
