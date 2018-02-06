import { NgModule } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { ErrorsDirective } from './errors.directive';

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
