import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

let fixture: ComponentFixture<HomeComponent>;


describe('Home', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        /* Sets up the router to be used for testing. */
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
  });
  it('should work', () => {
    expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');
  });
});

