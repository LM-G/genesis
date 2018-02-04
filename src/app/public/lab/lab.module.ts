import { NgModule } from '@angular/core';
import { LabComponent } from '@genesis/public/lab/lab.component';
import { LabRoutingModule } from '@genesis/public/lab/lab.router';
import { SharedModule } from '../../shared/shared.module';

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
