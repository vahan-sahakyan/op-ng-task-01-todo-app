import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCompletedComponent } from './clear-completed.component';

describe('ClearCompletedComponent', () => {
  let component: ClearCompletedComponent;
  let fixture: ComponentFixture<ClearCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClearCompletedComponent]
    });
    fixture = TestBed.createComponent(ClearCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
