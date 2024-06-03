import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-footer-info',
  styleUrls: ['./footer-info.component.scss'],
  templateUrl: './footer-info.component.html',
})
export class FooterInfoComponent {
  @Input() uncompletedTasks: ITodo[] = [];
  @Input() todos: ITodo[] = [];
}
