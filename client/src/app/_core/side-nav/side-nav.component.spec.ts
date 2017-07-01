import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavComponent } from './side-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { SideNavService } from './side-nav.service';

// variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////

let fixture: ComponentFixture<SideNavComponent>;
let component: SideNavComponent;
let de: DebugElement;
let sideNavService;

// mocks and utilities /////////////////////////////////////////////////////////////////////////////////////////////////

// tests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('SideNav', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavComponent],
            providers: [
                SideNavService
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
        sideNavService = de.injector.get(SideNavService);
    });

    it('should work', () => {
        expect(component instanceof SideNavComponent).toBe(true, 'should create SideNavComponent');
    });
});


