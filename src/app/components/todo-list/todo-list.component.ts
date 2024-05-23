import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
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
        (editTodo)="handleEditTodo(todo)"
        (deleteTodo)="handleDeleteTodo(todo)"
        [todo]="todo"
      ></app-todo-item>
    </ul>
  `,
})
export class TodoListComponent {
  uncompletedTasks$ = this.todoService.uncompletedTasks$;
  todos$ = this.todoService.todos$;
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todos$, this.uncompletedTasks$]).subscribe(
      ([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      }
    );
  }

  handleToggleCompleted(todo: ITodo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }
  handleEditTodo(todo: ITodo) {
    // this.todoService.updateTodo(todo).subscribe();
  }
  handleDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}
