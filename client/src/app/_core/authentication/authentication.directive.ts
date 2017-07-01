import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { GenesisCore } from '../core.service';
import { User } from '../../_shared/models/user.model';

import { findKey } from 'lodash';
import { AuthLevel, IAuthLevel } from '../../_shared/constants/auth-level.constant';

/**
 * Handles the visibility of elements in function of user authentication level.
 */
@Directive({ selector: '[genesisAuth]' })
export class AuthenticationDirective implements OnInit{
    @Input() genesisAuth: string;

    constructor(private el: ElementRef, private genesis: GenesisCore) {
    }

    ngOnInit(): void {
        if(this.genesisAuth == null){
            this.genesisAuth = AuthLevel.CLIENT.code;
        }
        let user = this.genesis.getUser();
        this.handleDisplay(user);

        this.genesis.user$.subscribe((user: User) => {
            this.handleDisplay(user);
        })
    }

    /**
     * Determine if the user can see an element or not. If the user can't see the element, it is hidden.
     * @param user current user
     */
    private handleDisplay(user: User): void {
        if(user){
            this.el.nativeElement.hidden = this.compareRole(user.role, this.genesisAuth) < 0;
        } else {
            this.el.nativeElement.hidden = true;
        }
    }

    /**
     * Determine if role 1 is equivalent or superior to role 2
     * @param role1 first role
     * @param role2 second role
     * @return negative value if role 2 > rol 1; 0 if role 1 equals role 2 ; positive value if role 1 > role 2
     */
    private compareRole(role1: string, role2: string) : number{
        let result = -1;
        const role1Key = findKey(AuthLevel, (key: IAuthLevel) => key.code === role1);
        const role2Key = findKey(AuthLevel, (key: IAuthLevel) => key.code === role2);

        if(role1Key && role2Key){
            let role1Value = AuthLevel[role1Key].value;
            let role2Value = AuthLevel[role2Key].value;
            result = role1Value - role2Value
        }
        return result;
    }
}