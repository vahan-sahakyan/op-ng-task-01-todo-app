import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosContainerComponent } from './todos-container.component';

describe('TodosContainerComponent', () => {
  let component: TodosContainerComponent;
  let fixture: ComponentFixture<TodosContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosContainerComponent]
    });
    fixture = TestBed.createComponent(TodosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
