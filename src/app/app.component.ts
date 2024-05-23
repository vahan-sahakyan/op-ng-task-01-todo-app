import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, concatMap, from, take } from 'rxjs';
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
  todos$: Observable<ITodo[]>;
  currentDate = dayjs().format('DD/MM/YYYY hh:MM A');
  uncompletedTasks: ITodo[] = [];

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit(): void {
    this.todoService.fetchTodos();
    this.todos$.subscribe((todos) => {
      this.uncompletedTasks = this.getUncompletedTasks(todos);
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
    this.todos$
      .pipe(
        take(1),
        concatMap((todos) => from(todos)),
        concatMap((todo) => {
          todo.completed = completed;
          return this.todoService.updateTodo(todo);
        })
      )
      .subscribe({
        complete: () => this.todoService.fetchTodos(),
      });
  }

  handleClearCompleted() {
    this.todos$.subscribe((todos) => {
      const completedTasks = todos.filter((t) => t.completed);
      completedTasks.forEach((ct) =>
        this.todoService.deleteTodo(ct.id).subscribe()
      );
    });
  }

  getUncompletedTasks(todos: ITodo[]): ITodo[] {
    return todos.filter((t) => !t.completed);
  }
}

/**
 *
 * PLAN
 *
 * 1. json-server DONE
 * 2. seperate components
 * 3. edit toggle
 *
 */
