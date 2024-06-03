import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  styleUrls: ['./todo-list.component.scss'],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: ITodo[] = [];
  @Input() uncompletedTasks: ITodo[] = [];
  editingId = '';

  /**
   * Track by function
   * @param _index
   * @param todo
   * @returns string | undefined
   */
  trackByFn(_index: number, todo: ITodo): string | undefined {
    return todo.id;
  }

  constructor(private todoService: TodoService) {}

  /**
   * Toggle the completed status of a todo
   * @param todo
   */
  handleToggleCompleted(todo: ITodo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  /**
   * Update the editingId
   * @param id
   */
  handleSelectEditingId(id: string): void {
    this.editingId = id;
  }

  /**
   * Handles editing or saving a todo
   * @param todo
   * @param title
   * @param isDirty
   */
  handleEditOrSaveTodo(todo: ITodo, title: string, isDirty: boolean): void {
    if (isDirty) this.todoService.updateTodo({ ...todo, title, completed: false }).subscribe();
    this.editingId = '';
  }

  /**
   * Handles deleting a todo
   * @param todo
   */
  handleDeleteOrCancelTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}
