import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import {
  Subject,
  combineLatest,
  concatMap,
  forkJoin,
  map,
  take,
  takeUntil,
} from 'rxjs';
import { ITodo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 p-4"
    >
      <app-todos-container>
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
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  uncompletedTasks$ = this.todoService.uncompletedTasks$;
  uncompletedTasks: ITodo[] = [];
  todos$ = this.todoService.todos$;
  todos: ITodo[] = [];
  private destroy$ = new Subject<void>();
  currentDate = dayjs().format('DD/MM/YYYY hh:MM A');

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit(): void {
    this.todoService.fetchTodos();
    combineLatest([this.todos$, this.uncompletedTasks$])
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

  handleSelectAll(e: Event) {
    const completed = (e.target as HTMLInputElement).checked;
    let fetchCount = 0;
    this.todos$
      .pipe(
        take(1),
        concatMap((todos) => {
          const updateObservables = todos.map((todo) => {
            todo.completed = completed;
            return this.todoService.updateTodo(todo, true);
          });
          return forkJoin(updateObservables);
        })
      )
      .subscribe({
        complete: () => {
          if (!fetchCount++) this.todoService.fetchTodos();
        },
      });
  }

  handleClearCompleted() {
    let fetchCount = 0;
    this.todos$
      .pipe(
        take(1),
        map((todos) => {
          const completedTasks = todos.filter((t) => t.completed);
          completedTasks.forEach((ct) =>
            this.todoService.deleteTodo(ct.id, true).subscribe()
          );
        })
      )
      .subscribe({
        complete: () => {
          if (!fetchCount++) this.todoService.fetchTodos();
        },
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
