import {
  AfterViewChecked,
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
      <figure class="flex items-center px-2 grow">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="onToggleCompleted()"
          class="mr-2 cursor-pointer"
        />
        <pre
          *ngIf="!isEditing; else editInputTemplate"
          [ngClass]="{ 'line-through': todo.completed }"
          class="dark:text-zinc-200  px-3 py-1 font-sans"
          >{{ todo.title }}</pre
        >
        <ng-template #editInputTemplate>
          <input
            #inputElementRef
            type="text"
            [defaultValue]="todo.title"
            [(ngModel)]="editingTitle"
            (keydown.enter)="onEditOrSaveTodo()"
            (keydown.esc)="onDeleteOrCancelTodo()"
            class="w-full dark:text-zinc-200
          dark:bg-zinc-700 outline-none px-3 py-1 rounded-full"
          />
        </ng-template>
      </figure>
      <aside [style.width]="'150px'" class="flex items-center px-2">
        <button
          (click)="onEditOrSaveTodo()"
          [disabled]="todo.completed"
          class="mr-2"
          [ngClass]="todo.completed
            ? 'pointer-events-none text-zinc-300 dark:text-zinc-500 opacity-0'
            : 'text-blue-500 active:text-blue-700 dark:text-blue-400 dark:active:text-blue-500'"
        >
        <!-- use ngClass -->
          <i class="fal {{ isEditing ? 'fa-check' : 'fa-edit' }}"></i>
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
        <!-- use ngClass -->
        <button
          [style.width]="'70px'"
          (click)="onDeleteOrCancelTodo()"
          class="{{
            isEditing
              ? 'text-zinc-700 dark:text-zinc-300'
              : todo.completed
              ? 'text-green-600 active:text-green-700 dark:text-green-500 dark:active:text-green-600'
              : 'text-red-500 active:text-red-700 dark:text-red-400 dark:active:text-red-500'
          }}"
        >
          <!-- use ngClass -->
          <i
            class="fal {{
              isEditing
                ? 'fa-xmark'
                : todo.completed
                ? 'fa-sparkles'
                : 'fa-trash'
            }}"
          ></i>
          {{ isEditing ? 'Cancel' : todo.completed ? 'Clear' : 'Delete' }}
        </button>
      </aside>
    </li>
  `,
})
export class TodoItemComponent implements AfterViewChecked {
  @Input() todo: ITodo = {} as ITodo;
  @Input() editingId = '';
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() editOrSaveTodo = new EventEmitter<{
    title: string;
    isDirty: boolean;
  }>();
  @Output() deleteOrCancelTodo = new EventEmitter<void>();
  @Output() selectEditingId = new EventEmitter<string>();
  @ViewChild('inputElementRef') inputElementRef!: ElementRef<HTMLInputElement>;
  prevTitle = '';
  editingTitle = '';

  get isDirty() {
    return this.prevTitle !== this.editingTitle.trim();
  }

  get isEditing() {
    return this.editingId === this.todo.id;
  }

  ngAfterViewChecked() {
    if (this.isEditing && this.inputElementRef)
      this.inputElementRef.nativeElement.focus();
  }

  onToggleCompleted() {
    this.toggleCompleted.emit();
  }
  onEditOrSaveTodo() {
    if (this.isEditing) {
      this.todo.title = this.editingTitle.trim();
      this.editOrSaveTodo.emit({
        title: this.editingTitle.trim(),
        isDirty: this.isDirty,
      });
    } else {
      this.selectEditingId.emit(this.todo.id);
      this.editingTitle = this.todo.title;
      this.prevTitle = this.editingTitle;
    }
  }
  onDeleteOrCancelTodo() {
    if (!this.isEditing) {
      this.deleteOrCancelTodo.emit();
    } else {
      this.editingTitle = this.prevTitle;
      this.selectEditingId.emit('');
    }
  }
}
