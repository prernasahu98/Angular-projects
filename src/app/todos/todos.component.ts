import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { GoogleApiService, UserInfo } from '../google-api.service';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  activeTodos: Todo[];
  completedTodos: Todo[];
  showValidationErrors: boolean;
  todos: Todo[];
  private newActiveTodo: Subscription;
  private newCompletedTodo: Subscription;

  userInfo?: UserInfo;

  constructor(private dataService: DataService,
    private dialog: MatDialog, private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info;
    })
  }

  ngOnInit() {

    // this.todos = this.dataService.getAllTodos();
    this.activeTodos = this.dataService.getAllActiveTodos();
    this.newActiveTodo = this.dataService.newActiveTodos.subscribe(
      (todo: Todo[]) => {
        this.activeTodos = todo;
      })

    this.completedTodos = this.dataService.getAllCompletedTodos();
    this.newCompletedTodo = this.dataService.newCompletedTodos.subscribe(
      (todo: Todo[]) => {
        this.completedTodos = todo;
      }
    )
  }

  setCompleted(todo: Todo, index: number) {
    this.dataService.addTodo(todo, true);
    this.dataService.deleteTodo(index, 'active');

  }

  setActive(todo: Todo, index: number) {
    this.dataService.addTodo(todo, false);
    this.dataService.deleteTodo(index, 'completed');
  }

  onEditActive(todo: Todo) {
    const index = this.activeTodos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '500px',
      height: '250px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.dataService.updateTodo(index, result, 'active')
        }
      })
  }

  onEditComplete(todo: Todo) {
    const index = this.completedTodos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '500px',
      height: '250px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.dataService.updateTodo(index, result, 'completed')
        }
      })
  }

  onDeleteActive(todo: Todo) {
    const index = this.activeTodos.indexOf(todo);

    this.dataService.deleteTodo(index, 'active');

  }

  onDeleteComplete(todo: Todo) {
    const index = this.completedTodos.indexOf(todo);

    this.dataService.deleteTodo(index, 'completed')
  }

  logOut() {
    this.googleApi.signOut();
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      return this.showValidationErrors = true;
    }

    else {
      this.dataService.addTodo(new Todo(form.value.text, false, 'active'), false);
    }
    form.reset();
    return this.showValidationErrors = false;
  }

}
