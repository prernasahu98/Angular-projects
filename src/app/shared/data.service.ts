import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  newActiveTodos = new Subject<Todo[]>();
  newCompletedTodos = new Subject<Todo[]>();

  // todos: Todo[] = [
  //   new Todo('this is another test', false),
  //   new Todo('this is a test', true)
  // ]

  activeTodos: Todo[] = [
    new Todo('this is another test', false, 'active')

  ];

  completedTodos: Todo[] = [
    new Todo('this is a test', true, 'completed')
  ];

  constructor() { }

  // getAllTodos() {
  //   return this.todos;
  // }

  getAllActiveTodos() {
    return this.activeTodos;
  }

  getAllCompletedTodos() {
    return this.completedTodos;
  }

  addTodo(todo: Todo, check: boolean) {

    if (check) {
      todo.status = 'completed';
      todo.completed = true;
      this.completedTodos.push(todo);
      this.newCompletedTodos.next(this.completedTodos.slice())
    }

    else {
      todo.status = 'active';
      todo.completed = false;
      this.activeTodos.push(todo);
      this.newActiveTodos.next(this.activeTodos.slice())
    }
  }

  updateTodo(index: number, updatedTodo: Todo, status: string) {
    if (status === 'completed') {
      updatedTodo.completed = true;
      updatedTodo.status = 'completed';
      this.completedTodos[index] = updatedTodo;
      this.newCompletedTodos.next(this.completedTodos.slice())
    }
    else {
      updatedTodo.status = 'active';
      updatedTodo.completed = false;
      this.activeTodos[index] = updatedTodo;
      this.newActiveTodos.next(this.activeTodos.slice())
    }
  }

  deleteTodo(index: number, status: string) {

    if (status === 'active') {
      this.activeTodos.splice(index, 1);
      this.newActiveTodos.next(this.activeTodos.slice())
    }
    else {
      this.completedTodos.splice(index, 1);
      this.newCompletedTodos.next(this.completedTodos.slice())
    }
  }
}
