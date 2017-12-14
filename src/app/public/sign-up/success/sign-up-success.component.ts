import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Sign in component
 */
@Component({
    selector: 'app-sign-up-success',
    templateUrl: './sign-up-success.component.html',
    styleUrls: [ './sign-up-success.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpSuccessComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit(): void {
        console.log('# SignUpSuccessComponent started');
    }
}
