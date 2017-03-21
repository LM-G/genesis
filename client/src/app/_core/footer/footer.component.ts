import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'genesis-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.css']
})

export class FooterComponent implements OnInit{
    constructor(private authService: AuthenticationService,
                private router: Router) {}


    ngOnInit(): void {
        console.log('sidebar initialisée');
    }
}
