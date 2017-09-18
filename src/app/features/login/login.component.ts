import { Component, OnInit } from '@angular/core';

/**
 * Dashboard component
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.debug('# LoginComponent started');
    }
}
