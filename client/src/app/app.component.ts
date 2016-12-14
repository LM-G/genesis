import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'genesis-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public showLogin: boolean = false;

    constructor(private route: ActivatedRoute){
    }

    ngOnInit(): void {
        /* todo : quand la fonctionnalité sera disponible, passer par des variables non liées à l'url ... */
        this.route.queryParams.subscribe((params : Params) => {
            console.log ('app params : ' , params);
            this.showLogin = params['sl'] === 't';
        });
    }
}
