import { NgModule } from '@angular/core';
import { PublicFeatureComponent } from './public-feature.component';
import { PublicRoutingModule } from './public-feature.router';

/**
 * Registers all public features and routes which require no authentication
 */
@NgModule({
  imports: [
    PublicRoutingModule
  ],
  declarations: [
    PublicFeatureComponent
  ]
})
export class PublicFeatureModule {
}
