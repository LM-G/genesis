import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

let fixture: ComponentFixture<DashboardComponent>;


describe('Dashboard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(DashboardComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof DashboardComponent).toBe(true, 'should create DashboardComponent');
    });
});

