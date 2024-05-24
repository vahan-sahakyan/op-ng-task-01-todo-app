import { Component } from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  styleUrls: ['./todo-list.component.scss'],
  template: `
    <ul>
      <app-todo-item
        *ngFor="let todo of todos"
        (toggleCompleted)="handleToggleCompleted(todo)"
        (editTodo)="handleEditTodo(todo, $event)"
        (selectEditingId)="handleSelectEditingId($event)"
        (deleteTodo)="handleDeleteTodo(todo)"
        [todo]="todo"
        [editingId]="editingId"
      ></app-todo-item>

      <li
        *ngIf="!todos.length"
        class="text-center dark:text-gray-300 font-bold p-3 select-none"
      >
        All tasks has been completed
      </li>
    </ul>
  `,
})
export class TodoListComponent {
  uncompletedTasks$ = this.todoService.uncompletedTasks$;
  uncompletedTasks: ITodo[] = [];
  todos$ = this.todoService.todos$;
  todos: ITodo[] = [];
  private destroy$ = new Subject<void>();
  editingId = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todos$, this.uncompletedTasks$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      });
  }

  handleToggleCompleted(todo: ITodo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }
  handleSelectEditingId(id: string) {
    this.editingId = id;
  }
  handleEditTodo(todo: ITodo, title: string) {
    this.todoService
      .updateTodo({ ...todo, title, completed: false })
      .subscribe();
    this.editingId = '';
  }
  handleDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
