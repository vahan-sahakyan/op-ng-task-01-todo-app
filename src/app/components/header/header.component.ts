import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() todos = [] as ITodo[];
  @Input() uncompletedTasks = [] as ITodo[];
  @Output() selectAll = new EventEmitter<boolean>();
  isSelectAll = this.checkIsSelectAll();

  ngAfterViewChecked(): void {
    this.isSelectAll = this.checkIsSelectAll();
  }

  /**
   * Checks if all todo items are selected.
   */
  checkIsSelectAll(): boolean {
    return !this.todos.length ? false : !this.uncompletedTasks.length;
  }

  /**
   * Emits selecting all todo items.
   */
  onSelectAll(): void {
    this.selectAll.emit(this.isSelectAll);
  }
}
