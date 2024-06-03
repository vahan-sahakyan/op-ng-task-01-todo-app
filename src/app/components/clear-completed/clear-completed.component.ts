import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-clear-completed',
  styleUrls: ['./clear-completed.component.scss'],
  templateUrl: './clear-completed.component.html',
})
export class ClearCompletedComponent {
  @Output() clearCompleted = new EventEmitter<void>();
  @Input() uncompletedTasks: ITodo[] = [];
  @Input() todos: ITodo[] = [];

  /**
   * Emits clearing all completed todos
   */
  onClearCompleted(): void {
    this.clearCompleted.emit();
  }
}
