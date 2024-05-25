import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer-info',
  styleUrls: ['./footer-info.component.scss'],
  template: `
    <div class="text-right text-zinc-600 dark:text-zinc-200 mt-4 select-none">
      <ng-template [ngIf]="todos.length">
        {{ uncompletedTasks.length }} uncompleted tasks
      </ng-template>
    </div>
  `,
})
export class FooterInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todoService.todos$, this.todoService.uncompletedTasks$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
