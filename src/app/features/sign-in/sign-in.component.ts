import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
    constructor(
    ) {}

    ngOnInit(): void {
        console.debug('# SignInComponent started');
    }
}
