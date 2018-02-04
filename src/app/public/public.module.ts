import { NgModule } from '@angular/core';
import { NotLoggedOnlyGuard } from './core/not-logged-only.guard';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.router';

@NgModule({
    imports: [
        PublicRoutingModule
    ],
    declarations: [
        PublicComponent
    ],
    providers: [
        NotLoggedOnlyGuard
    ]
})

export class PublicModule {
}
