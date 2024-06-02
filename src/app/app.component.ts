import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, forkJoin, takeUntil } from 'rxjs';
import { ITodo } from './models/todo.model';
import { TodoService } from './services/todo.service';

// Notes:
// create html file for the component.
// use more readable variables.
// put docs on all the methods and their return type.
// put types for the callback functions parameters.
// these notes should apply on all ts files.

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
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

  /**
   * Handles adding a new todo item to the list.
   * @param newTodoTitle the title of the todo item.
   */
  handleAddTodo(newTodoTitle: string) {
    const todo = {
      id: window.crypto.randomUUID(),
      title: newTodoTitle,
      completed: false,
    } satisfies ITodo;
    this.todoService.addTodo(todo).subscribe();
  }

  handleSelectAll(isSelectAll: boolean) {
    // instead of updating each todo item like this (multiple endpoint hits), maybe you can create a new endpoint in todo service
    // to handle that.
    // this.todoService.toggleAllTodoItems(true or false)

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

    // use ref (viewChild) instead of document.
    isSelectAll &&
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
  }

  handleClearCompleted() {
    const completedTasks = this.todos.filter((item) => item.completed);
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
