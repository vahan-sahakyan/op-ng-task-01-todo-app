import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-clear-completed',
  styleUrls: ['./clear-completed.component.scss'],
  template: `
    <div>
      <button
        *ngIf="uncompletedTasks.length !== todos.length"
        (click)="onClearCompleted()"
        class="bg-red-600 dark:bg-red-500 text-white mt-4 w-full py-2 rounded-md active:bg-red-700 dark:active:bg-red-600 select-none"
      >
        Clear Completed
      </button>
    </div>
  `,
})
export class ClearCompletedComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Output() clearCompleted = new EventEmitter<void>();
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todoService.todos$, this.todoService.uncompletedTasks$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      });
  }

  onClearCompleted() {
    this.clearCompleted.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
