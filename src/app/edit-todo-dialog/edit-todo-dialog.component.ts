import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  close() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return

    const updateTodo = {
      ...this.todo,
      ...form.value
    }
    this.dialogRef.close(updateTodo);
  }

}
