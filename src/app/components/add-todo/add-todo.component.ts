import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  styleUrls: ['./add-todo.component.scss'],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent {
  @Output() addTodo = new EventEmitter<string>();
  newTodoTitle: string = '';

  /**
   * Emits adding a new todo item to the list.
   */
  onAddTodo(): void {
    if (!this.newTodoTitle.trim()) return;
    this.addTodo.emit(this.newTodoTitle.trim());
    this.newTodoTitle = '';
  }
}
