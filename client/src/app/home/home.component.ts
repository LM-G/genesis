import { Component, OnInit } from '@angular/core';

/**
 * Home component
 */
@Component({
    selector: 'genesis-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
    public sections: Array<number> = Array(2);
    constructor() {}

    ngOnInit(): void {
        console.log('coucouc !');
    }
}
