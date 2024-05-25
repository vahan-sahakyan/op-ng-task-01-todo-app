import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div
      class="relative flex justify-between items-center mb-4 mt-10 select-none"
    >
      <h1
        class="text-2xl font-bold text-center flex-grow dark:text-white select-none"
      >
        TODO LIST
      </h1>
      <div class="flex ml-4 cursor-pointer absolute">
        <input
          type="checkbox"
          id="select-all"
          [(ngModel)]="isSelectAll"
          (change)="onSelectAll()"
          class="mr-2 cursor-pointer"
          [disabled]="!todos.length"
        />
        <label for="select-all" class="cursor-pointer dark:text-white">
          Select All
        </label>
      </div>
    </div>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  todos = [] as ITodo[];
  isSelectAll = false;

  @Output() selectAll = new EventEmitter<boolean>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todoService.todos$, this.todoService.uncompletedTasks$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.isSelectAll = !todos.length ? false : !uncompletedTasks.length;
      });
  }

  onSelectAll() {
    this.selectAll.emit(this.isSelectAll);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
