import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignUpComponent } from './sign-up.component';

let fixture: ComponentFixture<SignUpComponent>;


describe('SignUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        /* Sets up the router to be used for testing. */
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(SignUpComponent);
  });
  it('should work', () => {
    expect(fixture.componentInstance instanceof SignUpComponent).toBe(true, 'should create SignUpComponent');
  });
});

