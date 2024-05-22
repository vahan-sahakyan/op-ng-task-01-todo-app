import { Component, OnInit } from '@angular/core';
import { ITodo } from './models/todo.model';
import * as dayjs from 'dayjs';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: ITodo[] = [];
  newTodoTitle = '';
  currentDate = dayjs().format('DD/MM/YYYY hh:MM A');
  uncompletedTasks: ITodo[] = this.#getUncompletedTasks();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.uncompletedTasks = this.#getUncompletedTasks();
    });
  }

  addTodo() {
    const todo = {
      id: window.crypto.randomUUID(),
      title: this.newTodoTitle,
      completed: false,
    } satisfies ITodo;

    this.todoService.addTodo(todo).subscribe(() => {
      this.todos.push(todo);
      this.uncompletedTasks = this.#getUncompletedTasks();
    });
  }

  selectAll(e: Event) {
    this.todos = this.todos.map((t) => ({
      ...t,
      completed: (<HTMLInputElement>e.target).checked,
    }));
    this.uncompletedTasks = this.#getUncompletedTasks();
  }

  deleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      this.uncompletedTasks = this.#getUncompletedTasks();
    });
  }

  editTodo(todo: ITodo) {
    // this.todoService.updateTodo(todo).subscribe();
  }

  toggleCompleted(todo: ITodo) {
    this.todos = this.todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    this.uncompletedTasks = this.#getUncompletedTasks();
  }

  clearCompleted() {
    const completedTasks = this.todos.filter((t) => t.completed);
    completedTasks.forEach((ct) => {
      this.todoService.deleteTodo(ct.id).subscribe();
      this.todos = this.#getUncompletedTasks();
    });
  }

  #getUncompletedTasks(): ITodo[] {
    return this.todos.filter((t) => !t.completed);
  }
}

/**
 *
 * PLAN
 *
 * 1. json-server DONE
 * 2. seperate components
 * 3. edit toggle
 *
 */
