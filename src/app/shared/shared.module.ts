import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatRippleModule, MatToolbarModule } from '@angular/material';
import { MobxAngularModule } from 'mobx-angular';
import { DisableControlDirective } from './component/disable-control.directive';
import { ErrorModule } from './component/errors/errors.module';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatCheckboxModule
];

const DIRECTIVES = [
    DisableControlDirective
];

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MobxAngularModule,

        ErrorModule,

        ...MATERIAL_MODULES,
        ...DIRECTIVES
    ],
    declarations: [
        ...DIRECTIVES
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {
}
