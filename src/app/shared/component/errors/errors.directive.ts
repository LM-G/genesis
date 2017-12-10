import { AfterViewInit, Directive, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { ErrorDetails, ErrorOptions } from './errors';
import { toArray } from '../../../util/to-array';

@Directive({
    selector: '[appErrors]'
})
export class ErrorsDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @Input('appErrors')
    controlName: string;
    control: AbstractControl;
    ready = false;
    errorDetails$: BehaviorSubject<ErrorDetails>;

    constructor(private form: FormGroupDirective) {}

    get errors() {
        if (!this.ready) return;
        return this.control.errors;
    }

    get hasErrors() {
        return !!this.errors;
    }

    hasError(name: string, conditions: ErrorOptions): boolean {
        return this.checkPropState('invalid', name, conditions);
    }

    isValid(name: string, conditions: ErrorOptions): boolean {
        return this.checkPropState('valid', name, conditions);
    }

    getError(name: string) {
        return this.ready ? this.control.getError(name) : undefined;
    }

    ngOnInit() {
        this.errorDetails$ = new BehaviorSubject<ErrorDetails>(null);
    }

    ngOnChanges() {
        this.control = this.form.control.get(this.controlName);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkStatus();
            this.control.statusChanges.subscribe(this.checkStatus.bind(this));
        });
    }

    ngOnDestroy() {
        this.errorDetails$.complete();
    }

    private checkPropState(prop: string, name: string, conditions: ErrorOptions): boolean {
        if (!this.ready) return;
        const controlPropsState = !conditions
            || toArray(conditions).every((condition: string) => this.control[ condition ]);

        if (name.charAt(0) === '*') {
            return this.control[ prop ] && controlPropsState;
        }
        return prop === 'valid' ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState;
    }

    private checkStatus() {
        const control = this.control;
        const errors = control.errors;
        this.ready = true;
        if (errors) {
            for (const errorName in errors) {
                this.errorDetails$.next({ control, errorName });
            }
        }
    }
}
