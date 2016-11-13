import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';


let fixture: ComponentFixture<NavComponent>;
let component: NavComponent;
let authService;

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
});


