import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.router';

@NgModule({
  imports: [
    PublicRoutingModule
  ],
  declarations: [
    PublicComponent
  ]
})
export class PublicModule {
}
