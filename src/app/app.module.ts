import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodosContainerComponent } from './component/todos-container/todos-container.component';
import { CurrentDateComponent } from './component/current-date/current-date.component';
import { HeaderComponent } from './component/header/header.component';
import { AddTodoComponent } from './component/add-todo/add-todo.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { FooterInfoComponent } from './component/footer-info/footer-info.component';
import { ClearCompletedComponent } from './component/clear-completed/clear-completed.component';

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
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
