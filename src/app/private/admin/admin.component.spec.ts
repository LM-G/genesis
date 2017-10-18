import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';

let fixture: ComponentFixture<AdminComponent>;


describe('Admin', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdminComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(AdminComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof AdminComponent).toBe(true, 'should create AdminComponent');
    });
});

