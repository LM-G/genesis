import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public.router';
import { PublicComponent } from './public.component';
import { NotLoggedOnlyGuard } from './core/not-logged-only.guard';

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

export class PublicModule {}