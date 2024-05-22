import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/todo.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  addTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.baseUrl}/todos`, todo, httpOptions);
  }

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.baseUrl}/todos`);
  }

  deleteTodo(id: ITodo['id']): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.baseUrl}/todos/${id}`);
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(
      `${this.baseUrl}/todos/${todo.id}`,
      todo,
      httpOptions
    );
  }
}
