import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, Input, Component } from '@angular/core';
import { By } from '@angular/platform-browser';


let fixture: ComponentFixture<AppComponent>;
let component: AppComponent, mockLoginEl, mockNavEl;

/**
 * Nav component mock
 */
@Component({
    selector: 'genesis-nav',
    template: ''
})
class MockNavComponent {
    @Output() public loginToggled = new EventEmitter();
}

/**
 * Login component mock
 */
@Component({
    selector: 'genesis-login',
    template: ''
})
class MockLoginComponent {
    @Input() public showLogin: boolean;
    @Output() public hide = new EventEmitter();
}

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent, MockLoginComponent, MockNavComponent ],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
    });

    it('should work', () => {
        expect(component instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

    it('should contain login component', ()=> {
        mockLoginEl = fixture.debugElement.query(By.directive(MockLoginComponent));
        expect(mockLoginEl).toBeTruthy();
    });

    it('should contain nav component', ()=> {
        mockNavEl = fixture.debugElement.query(By.directive(MockLoginComponent));
        expect(mockNavEl).toBeTruthy();
    });
});

