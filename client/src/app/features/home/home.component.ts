import { Component, OnInit } from '@angular/core';

/**
 * Home component
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
    public sections: Array<number> = Array(20);
    constructor(
    ) {}

    ngOnInit(): void {
        console.debug('# HomeComponent started');
    }
}
