import { Component } from '@angular/core';

@Component({
  selector: 'app-private',
  template: `
    <app-side-nav></app-side-nav>
    <div id="page">
      <app-header></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>`,
  styleUrls: [ './private-feature.component.scss' ]
})
export class PrivateFeatureComponent {
}
