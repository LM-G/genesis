import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
        private router: Router
    ) {}

    ngOnInit(): void {
        console.debug('# SignInComponent started');
    }

    register(){
        this.router.navigate(['/sign-up']);
    }
}
