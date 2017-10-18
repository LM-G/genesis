import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public.router';
import { PublicComponent } from './public.component';

@NgModule({
    imports: [
        PublicRoutingModule
    ],
    declarations: [
        PublicComponent
    ]
})

export class PublicModule {}