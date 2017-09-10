import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { find } from 'lodash';

import { NavComponent } from './nav.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoginService } from '../login/login.service';
import { instance, mock } from 'ts-mockito';
import { SideNavService } from '../side-nav/side-nav.service';

// variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let fixture: ComponentFixture<NavComponent>;
let component: NavComponent;
let de: DebugElement;
let authService : AuthenticationService;
let btnLogin, btnLogout;

// mocks and utilities /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// tests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Nav', () => {
    beforeEach(() => {
        let authServiceStub = mock(AuthenticationService);

        TestBed.configureTestingModule({
            declarations: [NavComponent],
            providers: [
                SideNavService,
                LoginService,
                {provide: AuthenticationService, useValue: instance(authServiceStub)}
            ],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        authService = de.injector.get(AuthenticationService);
        fixture.detectChanges(); // initial binding
    });

    it('should work', () => {
        expect(component instanceof NavComponent).toBe(true, 'should create NavComponent');
    });

    it('should have home link', () => {
        const links: DebugElement[] = de.queryAll(By.css('a'));

        const homeLink: DebugElement = find(links, function(el){
            return el.nativeElement.textContent === 'Genesis';
        });

        expect(homeLink).toBeTruthy('should have home link : Genesis');
    });

    it('should have logout button instead of login button if user is connected', () => {
        const isLogged = true;

        spyOn(authService, 'loggedIn').and.returnValue(isLogged);
        spyOn(authService, 'notLoggedIn').and.returnValue(!isLogged);

        fixture.detectChanges();

        btnLogin = de.query(By.css('button#login'));
        btnLogout = de.query(By.css('button#logout'));

        expect(btnLogout).toBeTruthy('should exist');
        expect(btnLogin).toBeNull('should not exist');
    });

    it('should have login button instead of logout button if user is disconnected', () => {
        const isLogged = false;

        spyOn(authService, 'loggedIn').and.returnValue(isLogged);
        spyOn(authService, 'notLoggedIn').and.returnValue(!isLogged);

        fixture.detectChanges();

        btnLogin = de.query(By.css('button#login'));
        btnLogout = de.query(By.css('button#logout'));

        expect(btnLogin).toBeTruthy('should exist');
        expect(btnLogout).toBeNull('should not exist');
    });
});


