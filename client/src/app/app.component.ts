import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthenticationService} from './_core/authentication/authentication.service';
import { LoginService } from './_core/login/login.service';
import { Genesis } from './_core/genesis.service';

@Component({
    selector: 'genesis-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(private route: ActivatedRoute,
                private authService : AuthenticationService,
                private genesis: Genesis,
                private loginService : LoginService){
    }

    ngOnInit(): void {
        /* todo : quand la fonctionnalité sera disponible, passer par des variables non liées à l'url ... */
        this.route.queryParams.subscribe((params : Params) => {
            console.log ('app params : ' , params);
            if(params['sl'] === 't' && this.authService.notLoggedIn()){
                this.loginService.show();
            }
        });
    }
}
