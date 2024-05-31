import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, forkJoin, takeUntil } from 'rxjs';
import { ITodo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div
      class="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 p-4"
    >
      <app-todos-container class="mt-10 mb-24">
        <app-current-date></app-current-date>
        <app-header (selectAll)="handleSelectAll($event)"></app-header>
        <app-add-todo (addTodo)="handleAddTodo($event)"></app-add-todo>
        <app-todo-list></app-todo-list>
        <app-footer-info></app-footer-info>
        <app-clear-completed
          (clearCompleted)="handleClearCompleted()"
        ></app-clear-completed>
      </app-todos-container>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];
  currentDate = new Date();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchTodos();
    combineLatest([this.todoService.todos$, this.todoService.uncompletedTasks$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      });
  }

  handleAddTodo(newTodoTitle: string) {
    const todo = {
      id: window.crypto.randomUUID(),
      title: newTodoTitle,
      completed: false,
    } satisfies ITodo;
    this.todoService.addTodo(todo).subscribe();
  }

  handleSelectAll(isSelectAll: boolean) {
    const updateObservableArray$ = this.todos.map((todo) => {
      todo.completed = isSelectAll;
      return this.todoService.updateTodo(todo, true);
    });
    forkJoin(updateObservableArray$).subscribe({
      next: () => {
        this.todoService.fetchTodos();
      },
      error: (err) => console.error('Error while updating tasks', err),
    });
    isSelectAll &&
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
  }

  handleClearCompleted() {
    const completedTasks = this.todos.filter((t) => t.completed);
    const deleteObservableArray$ = completedTasks.map((ct) =>
      this.todoService.deleteTodo(ct.id, true)
    );
    forkJoin(deleteObservableArray$).subscribe({
      next: () => this.todoService.fetchTodos(),
      error: (err) => console.error('Error while deleting tasks', err),
    });
  }

  getUncompletedTasks(todos: ITodo[]): ITodo[] {
    return todos.filter((t) => !t.completed);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
