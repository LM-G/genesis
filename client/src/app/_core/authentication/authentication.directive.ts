import { Directive, ElementRef } from '@angular/core';
@Directive({ selector: '[genesisAuth]' })
export class AuthenticationDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}