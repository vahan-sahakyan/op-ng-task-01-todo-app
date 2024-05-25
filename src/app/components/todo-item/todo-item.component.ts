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
    <li
      class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-600 p-2 rounded-md mb-2 select-none"
    >
      <div class="flex items-center px-2 grow">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="onToggleCompleted()"
          class="mr-2 cursor-pointer"
        />
        <pre
          *ngIf="!isEditing; else editInputEl"
          [ngClass]="{ 'line-through': !!todo.completed }"
          class="dark:text-zinc-200  px-3 py-1 font-sans"
          >{{ todo.title }}</pre
        >
        <ng-template #editInputEl>
          <input
            type="text"
            [value]="todo.title"
            [(ngModel)]="todo.title"
            (input)="isDirty = true"
            (keydown.enter)="onEditTodo()"
            class="w-full dark:text-zinc-200 dark:bg-zinc-700 outline-none px-3 py-1 rounded-full"
          />
        </ng-template>
      </div>
      <div [style.width]="'150px'" class="flex items-center px-2">
        <button
          (click)="onEditTodo()"
          class="text-blue-500 active:text-blue-700 dark:text-blue-400 dark:active:text-blue-500 mr-2"
        >
          <i class="fal {{ isEditing ? 'fa-check' : 'fa-edit' }}"></i>
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
        <button
          [style.width]="'70px'"
          (click)="onDeleteTodo()"
          class="text-red-500 active:text-red-700 dark:text-red-400 dark:active:text-red-500"
        >
          <i class="fal {{ isEditing ? 'fa-xmark' : 'fa-trash' }}"></i>
          {{ isEditing ? 'Cancel' : 'Delete' }}
        </button>
      </div>
    </li>
  `,
})
export class TodoItemComponent {
  @Input() todo: ITodo = {} as ITodo;
  @Input() editingId = '';
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() editTodo = new EventEmitter<{ title: string; isDirty: boolean }>();
  @Output() deleteTodo = new EventEmitter<void>();
  @Output() selectEditingId = new EventEmitter<string>();
  @ViewChild('editInputEl') editInputRef!: ElementRef<HTMLInputElement>;

  isDirty = false;

  get isEditing() {
    return this.editingId === this.todo.id;
  }

  onToggleCompleted() {
    this.toggleCompleted.emit();
  }
  onEditTodo() {
    if (this.isEditing)
      this.editTodo.emit({
        title: this.todo.title.trim(),
        isDirty: this.isDirty,
      });
    else this.selectEditingId.emit(this.todo.id);
    this.isDirty = false;
  }
  onDeleteTodo() {
    if (!this.isEditing) this.deleteTodo.emit();
    else this.selectEditingId.emit('');
  }
}
