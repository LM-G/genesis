import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NavComponent }  from './core/nav';
import { LoginComponent }  from './core/login';

let fixture: ComponentFixture<AppComponent>;

/* todo fix tests :/ */
describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, NavComponent, LoginComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it ('should work', () => {
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

});

