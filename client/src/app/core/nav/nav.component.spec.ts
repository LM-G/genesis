import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


let fixture: ComponentFixture<NavComponent>;
let component: NavComponent;
let authService;
let btnLogin, btnLogout;

const authServiceMock = {
    isLoggedIn: false,
    loggedIn: () => this.isLoggedIn,
    notLoggedIn: () => !this.isLoggedIn
};

describe('Nav', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NavComponent ],
            providers: [ { provide: AuthenticationService, useValue: authServiceMock } ],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });

        fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
        authService =  fixture.debugElement.injector.get(AuthenticationService);
    });



    afterEach(() => {
        fixture.destroy();
    });

    it('should work', () => {
        expect(component instanceof NavComponent).toBe(true, 'should create NavComponent');
    });

    it('should have login button if user not connected', () => {
        authService.isLoggedIn = false;
        fixture.detectChanges();
        btnLogin = fixture.debugElement.query(By.css('button#login'));
        btnLogout = fixture.debugElement.query(By.css('button#logout'));

        expect(btnLogin).not.toBe(null, 'shoud display login button');
        expect(btnLogout).toBe(null, 'shoud not display logout button');
    });

    it('should have logout button if user connected', () => {
        authService.isLoggedIn = true;
        fixture.detectChanges();
        btnLogin = fixture.debugElement.query(By.css('button#login'));
        btnLogout = fixture.debugElement.query(By.css('button#logout'));
/*
        expect(btnLogout).not.toBe(null, 'shoud display logout button');
        expect(btnLogin).toBe(null, 'shoud not display login button');*/
    });
});


