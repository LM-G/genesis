import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

let fixture: ComponentFixture<LoginComponent>;


describe('Login', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(LoginComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof LoginComponent).toBe(true, 'should create LoginComponent');
    });
});

