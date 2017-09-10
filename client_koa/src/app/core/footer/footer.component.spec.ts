import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';

// variables ///////////////////////////////////////////////////////////////////////////////////////////////////////////

let fixture: ComponentFixture<FooterComponent>;
let component: FooterComponent;
let de: DebugElement;

// mocks and utilities /////////////////////////////////////////////////////////////////////////////////////////////////

// tests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Footer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent],
            providers: [],
            imports: []
        });

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should work', () => {
        expect(component instanceof FooterComponent).toBe(true, 'should create FooterComponent');
    });
});


