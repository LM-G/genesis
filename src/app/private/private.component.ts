import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-private',
    templateUrl : './private.component.html'
})
export class PrivateComponent implements OnInit{
    ngOnInit(): void {
        console.debug('# PrivateComponent started');
    }
}