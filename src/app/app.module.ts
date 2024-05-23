import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';
import { HeaderComponent } from './components/header/header.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FooterInfoComponent } from './components/footer-info/footer-info.component';
import { ClearCompletedComponent } from './components/clear-completed/clear-completed.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosContainerComponent,
    CurrentDateComponent,
    HeaderComponent,
    AddTodoComponent,
    TodoListComponent,
    FooterInfoComponent,
    ClearCompletedComponent,
    TodoItemComponent,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
