import { Component, OnInit } from '@angular/core';

/**
 * Galaxy component
 */
@Component({
    selector: 'app-galaxy',
    templateUrl: './galaxy.component.html'
})
export class GalaxyComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.debug('# GalaxyComponent started');
    }
}
