import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from 'ng2-translate';

let fixture: ComponentFixture<HomeComponent>;


describe('Home', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule,
                TranslateModule.forRoot()
            ]
        });
        fixture = TestBed.createComponent(HomeComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');
    });
});

