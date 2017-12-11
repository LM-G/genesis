import { Component, OnInit } from '@angular/core';

/**
 * Side navigation component
 */
@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: [ 'side-nav.component.scss' ]
})
export class SideNavComponent implements OnInit {
    /**
     * Side nav component's constructor
     */
    constructor() {}

    ngOnInit(): void {
        console.debug('# SideNavComponent started');

    }
}
