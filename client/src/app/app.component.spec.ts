import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TranslateModule } from 'ng2-translate';

let fixture: ComponentFixture<AppComponent>;


describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                /* Sets up the router to be used for testing. */
                RouterTestingModule,
                TranslateModule.forRoot()
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
    });
    it ('should work', () => {
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

});

