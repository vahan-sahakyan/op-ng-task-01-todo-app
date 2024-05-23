import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer-info',
  template: `
    <!-- Uncompleted Tasks Count -->
    <div class="text-right text-zinc-600 dark:text-zinc-200 mt-4">
      {{ uncompletedTasks.length }} uncompleted tasks
    </div>
  `,
  styleUrls: ['./footer-info.component.scss'],
})
export class FooterInfoComponent {
  uncompletedTasks$ = this.todoService.uncompletedTasks$;
  todos$ = this.todoService.todos$;
  uncompletedTasks: ITodo[] = [];
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    combineLatest([this.todos$, this.uncompletedTasks$]).subscribe(
      ([todos, uncompletedTasks]) => {
        this.todos = todos;
        this.uncompletedTasks = uncompletedTasks;
      }
    );
  }
}
