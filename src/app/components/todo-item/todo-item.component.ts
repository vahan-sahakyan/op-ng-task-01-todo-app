import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  styleUrls: ['./todo-item.component.scss'],
  template: `
    <!-- Todo Item -->
    <li
      class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-600 p-2 rounded-md mb-2"
    >
      <div class="flex items-center px-2 grow">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="onToggleCompleted()"
          class="mr-2 cursor-pointer"
        />
        <span
          *ngIf="!isEditing; else editInput"
          [ngClass]="{ 'line-through': !!todo.completed }"
          class="dark:text-zinc-200  px-3 py-1"
          >{{ todo.title }}</span
        >
        <ng-template #editInput>
          <input
            type="text"
            [value]="todo.title"
            [(ngModel)]="todo.title"
            (keydown.enter)="onEditTodo()"
            class="w-full dark:text-zinc-200 dark:bg-zinc-700 outline-none px-3 py-1"
          />
        </ng-template>
      </div>
      <div [style.width]="'150px'" class="flex items-center px-2">
        <button
          (click)="onEditTodo()"
          class="text-blue-500 active:text-blue-700 dark:text-blue-400 dark:active:text-blue-500 mr-2"
        >
          <i class="far {{ isEditing ? 'fa-check' : 'fa-edit' }}"></i>
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
        <button
          [style.width]="'70px'"
          (click)="onDeleteTodo()"
          class="text-red-500 active:text-red-700 dark:text-red-400 dark:active:text-red-500"
        >
          <i class="far {{ isEditing ? 'fa-xmark' : 'fa-trash' }}"></i>
          {{ isEditing ? 'Cancel' : 'Delete' }}
        </button>
      </div>
    </li>
  `,
})
export class TodoItemComponent {
  @Input() todo: ITodo = {} as ITodo;
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() editTodo = new EventEmitter<string>();
  @Output() deleteTodo = new EventEmitter<void>();
  isEditing = false;

  @ViewChild('editInput') editInputRef!: ElementRef<HTMLInputElement>;

  onToggleCompleted() {
    this.toggleCompleted.emit();
  }
  onEditTodo() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) return;
    this.editTodo.emit(this.todo.title);
  }
  onDeleteTodo() {
    if (this.isEditing) return void (this.isEditing = !this.isEditing);
    this.deleteTodo.emit();
  }
}
