import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthenticationService} from './_core/authentication/authentication.service';

@Component({
    selector: 'genesis-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public showLogin: boolean = false;

    constructor(private route: ActivatedRoute, private authService : AuthenticationService){
    }

    ngOnInit(): void {
        /* todo : quand la fonctionnalité sera disponible, passer par des variables non liées à l'url ... */
        this.route.queryParams.subscribe((params : Params) => {
            console.log ('app params : ' , params);
            this.showLogin = this.authService.notLoggedIn() ? params['sl'] === 't' : false;
        });
    }
}
