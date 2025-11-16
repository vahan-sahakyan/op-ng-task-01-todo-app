import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
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
  @ViewChild('appCompoenentRef') appCompoenentRef!: ElementRef<HTMLDivElement>;

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
  handleAddTodo(newTodoTitle: string): void {
    const todo = {
      id: window.crypto.randomUUID(),
      title: newTodoTitle,
      completed: false,
    } satisfies ITodo;
    this.todoService.addTodo(todo).subscribe();
  }

  /**
   * Handles toggling all todo items.
   * @param isSelectAll
   */
  handleSelectAll(isSelectAll: boolean): void {
    this.todoService.toggleAllTodoItems(isSelectAll).subscribe({
      next: () => this.todoService.fetchTodos(),
      error: (err) => console.error('Error while updating tasks', err),
    });

    if (isSelectAll) {
      this.appCompoenentRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }

  /**
   * Handles deleting all completed todo items.
   */
  handleClearCompleted(): void {
    this.todoService.deleteCompletedTodos().subscribe({
      next: () => this.todoService.fetchTodos(),
      error: (err) => console.error('Error while deleting tasks', err),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
