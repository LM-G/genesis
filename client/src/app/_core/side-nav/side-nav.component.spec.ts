import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SideNavComponent } from './side-nav.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthServiceStub } from '../../../testing/auth-stubs';
import { LoginService } from '../login/login.service';

// variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////

let fixture: ComponentFixture<SideNavComponent>;
let component: SideNavComponent;
let de: DebugElement;
let authService;

// mocks and utilities /////////////////////////////////////////////////////////////////////////////////////////////////

// tests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Layout', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavComponent],
            providers: [
                LoginService,
                {provide: AuthenticationService, useClass: AuthServiceStub}
            ],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        });

        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        authService = de.injector.get(AuthenticationService);
    });

    it('should work', () => {
        expect(component instanceof SideNavComponent).toBe(true, 'should create SideNavComponent');
    });
});


