// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/todo.model';
import { Observable, BehaviorSubject, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<ITodo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  private uncompletedTasksSubject = new BehaviorSubject<ITodo[]>([]);
  public uncompletedTasks$ = this.uncompletedTasksSubject.asObservable();

  private baseUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  fetchTodos(): void {
    this.http
      .get<ITodo[]>(`${this.baseUrl}/todos`)
      .pipe(
        tap((todos) => {
          this.todosSubject.next(todos);
          this.updateUncompletedTasks(todos);
        })
      )
      .subscribe();
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    return this.http
      .post<ITodo>(`${this.baseUrl}/todos`, todo, httpOptions)
      .pipe(
        tap(() => this.fetchTodos()) // Refresh todos list after adding
      );
  }

  deleteTodo(id: ITodo['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`).pipe(
      tap(() => this.fetchTodos()) // Refresh todos list after deleting
    );
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http
      .put<ITodo>(`${this.baseUrl}/todos/${todo.id}`, todo, httpOptions)
      .pipe(
        tap(() => this.fetchTodos()) // Refresh todos list after updating
      );
  }

  private updateUncompletedTasks(todos: ITodo[]): void {
    const uncompletedTasks = todos.filter((todo) => !todo.completed);
    this.uncompletedTasksSubject.next(uncompletedTasks);
  }
}
