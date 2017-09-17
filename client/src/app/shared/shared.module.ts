import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MdButtonModule, MdInputModule, MdRippleModule, MdToolbarModule } from '@angular/material';

const MATERIAL_MODULES = [
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdRippleModule
];

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        ...MATERIAL_MODULES
    ],
    declarations: []
})
export class SharedModule {}
