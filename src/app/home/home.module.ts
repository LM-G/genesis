import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/$shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.router';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {
}
