import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { homeRouting } from './home.route';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        homeRouting
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}
