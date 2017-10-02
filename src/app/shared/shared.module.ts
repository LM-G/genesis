import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdRippleModule, MdToolbarModule } from '@angular/material';
import { DisableControlDirective } from './components/disable-control.directive';

const MATERIAL_MODULES = [
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdRippleModule,
    MdCardModule,
    MdCheckboxModule
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
        NgxErrorsModule,
        BrowserAnimationsModule,
        ...MATERIAL_MODULES,

        ...DIRECTIVES
    ],
    declarations: [
        ...DIRECTIVES
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
