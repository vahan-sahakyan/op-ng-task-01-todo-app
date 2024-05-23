import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  styleUrls: ['./todo-item.component.scss'],
  template: `
    <!-- Todo Item -->
    <li
      class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-600 p-2 rounded-md mb-2"
    >
      <div class="flex items-center px-2">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="onToggleCompleted()"
          class="mr-2 cursor-pointer"
        />
        <span
          [ngClass]="{ 'line-through': !!todo.completed }"
          class="dark:text-zinc-200"
          >{{ todo.title || 'No title' }}</span
        >
      </div>
      <div class="flex items-center px-2">
        <button
          (click)="onEditTodo()"
          class="text-blue-500 active:text-blue-700 mr-2"
        >
          <i class="fas fa-edit"></i>
          Edit
        </button>
        <button
          (click)="onDeleteTodo()"
          class="text-red-500 active:text-red-700"
        >
          <i class="fas fa-trash"></i>
          Delete
        </button>
      </div>
    </li>
  `,
})
export class TodoItemComponent {
  @Input() todo: ITodo = {} as ITodo;
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() editTodo = new EventEmitter<void>();
  @Output() deleteTodo = new EventEmitter<void>();

  onToggleCompleted() {
    this.toggleCompleted.emit();
  }
  onEditTodo() {
    this.editTodo.emit();
  }
  onDeleteTodo() {
    this.deleteTodo.emit();
  }
}
