import { Component, OnInit } from '@angular/core';

/**
 * Dashboard component
 */
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.debug('# DashboardComponent started');
    }
}
