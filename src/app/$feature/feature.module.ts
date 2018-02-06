import { NgModule } from '@angular/core';
import { PrivateFeatureModule } from '@genesis/$feature/private/private-feature.module';
import { PublicFeatureModule } from '@genesis/$feature/public/public-feature.module';

/**
 * Registers all application features and exposes them through lazy loading
 */
@NgModule({
  exports: [
    PublicFeatureModule,
    PrivateFeatureModule
  ]
})
export class FeatureModule {
}
