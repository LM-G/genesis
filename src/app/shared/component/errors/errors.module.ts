import { NgModule } from '@angular/core';
import { ErrorsDirective } from './errors.directive';
import { ErrorDirective } from './error.directive';

const DEPENDENCIES = [
    ErrorsDirective,
    ErrorDirective
];

@NgModule({
    declarations: [ ...DEPENDENCIES ],
    exports: [ ...DEPENDENCIES ]
})
export class ErrorModule {
}
