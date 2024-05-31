import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  styleUrls: ['./add-todo.component.scss'],
  template: `
    <form (ngSubmit)="onAddTodo()" class="mb-4">
      <div class="flex">
        <input
          required
          type="text"
          [(ngModel)]="newTodoTitle"
          name="todo"
          class="flex-grow p-1 px-4 border rounded-l-md focus:outline-none select-none"
          placeholder="Add a new task"
        />

        <button
          type="submit"
          [disabled]="!newTodoTitle.trim()"
          class="bg-blue-600  dark:bg-blue-500 text-white p-2 px-10 ps-8 rounded-r-md select-none ease-in-out duration-100 {{
            !newTodoTitle.trim() && 'bg-gray-400 dark:bg-gray-500'
          }}"
        >
          <i class="fa-light fa-plus-circle pe-2"></i>
          Add
        </button>
      </div>
    </form>
  `,
})
export class AddTodoComponent {
  @Output() addTodo = new EventEmitter<string>();
  newTodoTitle: string = '';

  onAddTodo() {
    if (!this.newTodoTitle.trim()) return;
    this.addTodo.emit(this.newTodoTitle.trim());
    this.newTodoTitle = '';
  }
}
