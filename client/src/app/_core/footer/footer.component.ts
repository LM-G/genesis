import { Component, OnInit } from '@angular/core';

/**
 * Footer component
 */
@Component({
    selector: 'genesis-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit{
    constructor() {}


    ngOnInit(): void {
        console.log('footer initialized');
    }
}
