import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User } from '../../_shared/models/user.model';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { GenesisStub } from '../../../testing/genesis-stubs';
import { AuthServiceStub } from '../../../testing/auth-stubs';
import { Genesis } from '../genesis.service';
import Spy = jasmine.Spy;

// variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////

let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;
let de: DebugElement;
let authService: AuthenticationService, userService: UserService;
let page: Page;

// mocks and utilities /////////////////////////////////////////////////////////////////////////////////////////////////
class Page {
    navSpy: Spy;
    btnSubmit: DebugElement;
    nameInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    template: DebugElement;

    constructor(){
        const router = TestBed.get(Router);
        this.navSpy  = spyOn(router, 'navigate');
    }

    init() {
        this.template = de.query(By.css('#login'));
        this.btnSubmit = de.query(By.css('button'));
        this.nameInput = de.query(By.css('input#username')).nativeElement;
        this.passwordInput = de.query(By.css('input#password')).nativeElement;
    }
}

function setInput(text: string, inputElement: HTMLInputElement) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
}

// tests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Login', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ],
            declarations: [LoginComponent],
            providers: [
                LoginService,
                {provide: AuthenticationService, useClass: AuthServiceStub},
                {provide: Genesis, useClass: GenesisStub}
            ]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        authService = de.injector.get(AuthenticationService);
        userService = de.injector.get(UserService);

        page = new Page();
    });

    it('should work', () => {
        expect(component instanceof LoginComponent).toBe(true, 'should create login component');
    });

    it('should render credential inputs if it is asked to', () => {
        let loginTpl = de.query(By.css('div#login'));
        expect(loginTpl).toBeNull('should not exist');

        component.showLogin = true;

        fixture.detectChanges();

        loginTpl = de.query(By.css('div#login'));
        expect(loginTpl).toBeTruthy('should be rendered');
    });

    it('should perform login on backend on submit', fakeAsync(() => {
        /* render login form */
        component.showLogin = true;
        fixture.detectChanges();

        page.init();
        /* mock return value from backend */
        spyOn(authService, 'login').and.returnValue(Observable.of(new User('', '', '')));

        /* set credentials */
        const password = 'secr3t';
        const username = 'Alice';


        setInput(password, page.passwordInput);
        setInput(username, page.nameInput);

        component.username = username;
        component.password = password;

        fixture.detectChanges();

        /* click submit button */
        expect(page.btnSubmit).toBeTruthy('should have submit button');
        page.btnSubmit.nativeElement.click();

        fixture.detectChanges();


        expect(component.loading).toBe(false, 'should not be loading');
        expect(authService.login).toHaveBeenCalledWith(username, password);
    }));
});

