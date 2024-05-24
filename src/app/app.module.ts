import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ClearCompletedComponent } from './components/clear-completed/clear-completed.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';
import { FooterInfoComponent } from './components/footer-info/footer-info.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';
import { DateTimePipe } from './pipes/date-time.pipe';

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
    DateTimePipe,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
