import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
@Component({
    selector: 'genesis-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
    }
}
