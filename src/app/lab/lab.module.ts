import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/$shared/shared.module';
import { LabComponent } from '@genesis/lab/lab.component';
import { LabRoutingModule } from '@genesis/lab/lab.router';

@NgModule({
  imports: [
    SharedModule,
    LabRoutingModule
  ],
  declarations: [
    LabComponent
  ]
})

export class LabModule {
}
