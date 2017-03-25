import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverviewComponent } from './overview.component';

let fixture: ComponentFixture<OverviewComponent>;


describe('Overview', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(OverviewComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof OverviewComponent).toBe(true, 'should create OverviewComponent');
    });
});

