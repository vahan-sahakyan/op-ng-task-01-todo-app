import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITodo } from '../models/todo.model';
// I like that you have created a mock DB and an API but for this task, you shouldn't complicate things.
// so I will not judge anything here.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class TodoService {
  private baseUrl = `http://${location.hostname}:5001`;

  private todosSubject = new BehaviorSubject<ITodo[]>([]);
  public todos$ = this.todosSubject.asObservable();
  public getTodos(): ITodo[] {
    return this.todosSubject.value;
  }
  public setTodos(todos: ITodo[]): void {
    this.todosSubject.next(todos);
  }

  private uncompletedTasksSubject = new BehaviorSubject<ITodo[]>([]);
  public uncompletedTasks$ = this.uncompletedTasksSubject.asObservable();
  public getUncompletedTasks(): ITodo[] {
    return this.uncompletedTasksSubject.value;
  }
  public setUncompletedTasks(todos: ITodo[]): void {
    this.uncompletedTasksSubject.next(todos);
  }

  constructor(private http: HttpClient) {}

  fetchTodos(): void {
    this.http
      .get<ITodo[]>(`${this.baseUrl}/todos`)
      .pipe(
        tap((todos) => {
          this.setTodos(todos);
          this.setUncompletedTasks(todos.filter((todo) => !todo.completed));
        })
      )
      .subscribe();
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    return this.http
      .post<ITodo>(`${this.baseUrl}/todos`, todo, httpOptions)
      .pipe(tap(() => this.fetchTodos()));
  }

  deleteTodo(id: ITodo['id'], isBulk = false): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/todos/${id}`)
      .pipe(tap(() => !isBulk && this.fetchTodos()));
  }

  updateTodo(todo: ITodo, isBulk = false): Observable<ITodo> {
    return this.http
      .put<ITodo>(`${this.baseUrl}/todos/${todo.id}`, todo, httpOptions)
      .pipe(tap(() => !isBulk && this.fetchTodos()));
  }
}
