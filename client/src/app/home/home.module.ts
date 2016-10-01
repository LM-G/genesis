import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { homeRouting } from './home.route';
import { SharedTranslateModule } from '../shared';

@NgModule({
    imports: [
        homeRouting,
        SharedTranslateModule
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}
