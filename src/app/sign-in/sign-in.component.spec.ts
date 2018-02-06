import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './sign-in.component';

let fixture: ComponentFixture<SignInComponent>;


describe('SignIn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        /* Sets up the router to be used for testing. */
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
  });
  it('should work', () => {
    expect(fixture.componentInstance instanceof SignInComponent).toBe(true, 'should create SignInComponent');
  });
});

