import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
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

  /**
   * Fetches todos from the API
   */
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

  /**
   * Adds a new todo to the API and fetches todos
   * @param todo
   */
  addTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.baseUrl}/todos`, todo, httpOptions).pipe(tap(() => this.fetchTodos()));
  }

  /**
   * Deletes a todo from the API by id and fetches todos
   * @param id
   * @param isBulk
   */
  deleteTodo(id: ITodo['id'], isBulk = false): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`).pipe(tap(() => !isBulk && this.fetchTodos()));
  }

  /**
   * Updates a todo in the API and fetches todos
   * @param todo
   * @param isBulk
   */
  updateTodo(todo: ITodo, isBulk = false): Observable<ITodo> {
    return this.http
      .put<ITodo>(`${this.baseUrl}/todos/${todo.id}`, todo, httpOptions)
      .pipe(tap(() => !isBulk && this.fetchTodos()));
  }

  /**
   * Toggles all todo items
   * @param isCompleted
   */
  toggleAllTodoItems(isCompleted: boolean): Observable<ITodo[]> {
    const updateObservableArray$ = this.todosSubject.value.map((todo) => {
      return this.updateTodo({ ...todo, completed: isCompleted }, true);
    });
    return forkJoin(updateObservableArray$);
  }

  /**
   * Deletes all completed todo items
   */
  deleteCompletedTodos(): Observable<void[]> {
    const completedTasks = this.todosSubject.value.filter((item) => item.completed);
    const deleteObservableArray$ = completedTasks.map((item) => this.deleteTodo(item.id, true));
    return forkJoin(deleteObservableArray$);
  }
}
