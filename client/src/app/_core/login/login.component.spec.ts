import {TestBed, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {DebugElement} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {User} from '../../_shared/models/user.model';
import {By} from '@angular/platform-browser';


let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;
let de: DebugElement;
let authService: AuthenticationService, userService: UserService;
let page: Page;

class AuthServiceMock {
    login(username: String, password: String): void {}

    loggedIn() {}

    notLoggedIn() {}
}

class UserServiceMock {
    user: User;

    getUser() {}
}

class Page {
    btnSubmit: DebugElement;
    nameInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    template: DebugElement;

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

describe('Login', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthServiceMock},
                {provide: UserService, useClass: UserServiceMock}
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

    /* fixme : faire passer ce foutu test ... */
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

        /*
        setInput(password, page.passwordInput);
        setInput(username, page.nameInput);
        */

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

    it('should inform nav component to hide credential inputs if login succeed', () => {

    });
});

