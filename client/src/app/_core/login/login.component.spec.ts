import { TestBed, ComponentFixture } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;

const authServiceMock = {
    isLoggedIn: true,
    loggedIn: () => this.isLoggedIn,
    notLoggedIn:() => !this.isLoggedIn
};

const userServiceMock = {
    user: null,
    getUser: () => Observable.of(this.user)
};
describe('Login', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ LoginComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                {provide: AuthenticationService, useValue: authServiceMock},
                {provide: UserService, useValue: userServiceMock}
            ]
        });

        fixture = TestBed.createComponent(LoginComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
    });

    it('should work', () => {
        expect(component instanceof LoginComponent).toBe(true, 'should create LoginComponent');
    });
});

