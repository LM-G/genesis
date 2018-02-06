import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { overviewRouting } from './overview.route';

@NgModule({
  imports: [
    overviewRouting,
  ],
  declarations: [
    OverviewComponent
  ]
})

export class OverviewModule {
}
