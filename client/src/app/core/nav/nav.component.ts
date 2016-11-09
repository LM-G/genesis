import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'genesis-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.css' ]
})

export class NavComponent implements OnInit {
    menuItems = [
        'Home'
    ];

    constructor() {}

    ngOnInit() {}
}
