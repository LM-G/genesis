import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { homeRouting } from './home.route';

@NgModule({
    imports: [
        homeRouting
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}
