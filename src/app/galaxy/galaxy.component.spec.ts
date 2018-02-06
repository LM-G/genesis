import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GalaxyComponent } from './galaxy.component';

let fixture: ComponentFixture<GalaxyComponent>;


describe('Galaxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GalaxyComponent ],
      imports: [
        /* Sets up the router to be used for testing. */
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(GalaxyComponent);
  });
  it('should work', () => {
    expect(fixture.componentInstance instanceof GalaxyComponent).toBe(true, 'should create GalaxyComponent');
  });
});

