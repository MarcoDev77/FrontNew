import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
      <nav class="navbar fixed-bottom footer" style="margin-bottom: 0;">
          <label class="mt-2 mx-auto">
              Fiscalía Morelos 2019. Todos los derechos reservados
          </label>
      </nav>
  `,
})
export class FooterComponent {
}
