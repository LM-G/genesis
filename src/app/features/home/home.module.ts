import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HOME_ROUTE_MODULE } from './home.router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        HOME_ROUTE_MODULE
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}
