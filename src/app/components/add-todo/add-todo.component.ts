import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  template: `
    <!-- Input Section -->
    <form (ngSubmit)="onAddTodo()" class="mb-4">
      <div class="flex">
        <input
          type="text"
          [(ngModel)]="newTodoTitle"
          name="todo"
          class="flex-grow p-1 px-4 border rounded-l-md focus:outline-none"
          placeholder="Add a new task"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 px-6 rounded-r-md active:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  @Output() addTodo = new EventEmitter<string>();
  newTodoTitle: string = '';

  onAddTodo() {
    this.addTodo.emit(this.newTodoTitle);
  }
}
