import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  styleUrls: ['./todo-item.component.scss'],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements AfterViewChecked {
  @Input() todo: ITodo = {} as ITodo;
  @Input() editingId = '';
  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() editOrSaveTodo = new EventEmitter<{ title: string; isDirty: boolean }>();
  @Output() deleteOrCancelTodo = new EventEmitter<void>();
  @Output() selectEditingId = new EventEmitter<string>();
  @ViewChild('inputElementRef') inputElementRef!: ElementRef<HTMLInputElement>;
  prevTitle = '';
  editingTitle = '';

  get isDirty(): boolean {
    return this.prevTitle !== this.editingTitle.trim();
  }

  get isEditing(): boolean {
    return this.editingId === this.todo.id;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing && this.inputElementRef) this.inputElementRef.nativeElement.focus();
  }

  /**
   * Emits toggling the completed status of the todo item.
   */
  onToggleCompleted(): void {
    this.toggleCompleted.emit();
  }

  /**
   * Emits editing or saving the todo item.
   */
  onEditOrSaveTodo(): void {
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
  /**
   * Emits deleting or canceling editing the todo item.
   */
  onDeleteOrCancelTodo(): void {
    if (!this.isEditing) {
      this.deleteOrCancelTodo.emit();
    } else {
      this.editingTitle = this.prevTitle;
      this.selectEditingId.emit('');
    }
  }
}
