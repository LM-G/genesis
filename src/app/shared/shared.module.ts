import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdRippleModule, MdToolbarModule } from '@angular/material';

const MATERIAL_MODULES = [
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdRippleModule,
    MdCardModule,
    MdCheckboxModule
];

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxErrorsModule,
        BrowserAnimationsModule,
        ...MATERIAL_MODULES
    ],
    declarations: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
