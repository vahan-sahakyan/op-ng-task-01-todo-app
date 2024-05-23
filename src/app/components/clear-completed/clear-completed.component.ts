import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-clear-completed',
  styleUrls: ['./clear-completed.component.scss'],
  template: `
    <!-- Clear Completed Button -->
    <div>
      <button
        *ngIf="uncompletedTasks.length !== todos.length"
        (click)="onClearCompleted()"
        class="bg-red-600 dark:bg-red-500 text-white mt-4 w-full py-2 rounded-md active:bg-red-700 dark:active:bg-red-600"
      >
        Clear Completed
      </button>
    </div>
  `,
})
export class ClearCompletedComponent {
  @Output() clearCompleted = new EventEmitter<void>();
  uncompletedTasks$ = this.todoService.uncompletedTasks$;
  todos$ = this.todoService.todos$;
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];
  // JSON = JSON;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todos$, this.uncompletedTasks$]).subscribe(
      ([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      }
    );
  }

  onClearCompleted() {
    this.clearCompleted.emit();
  }
}
