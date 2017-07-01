import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'genesis-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {
    public sections: Array<number> = Array(2);
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        console.log('coucouc !');
    }
}
