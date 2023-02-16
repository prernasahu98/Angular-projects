import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import tippy from 'tippy.js';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, AfterViewInit {

  @Input() todo: Todo;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();

  @ViewChild('editBtn') editBtnEleRef: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    tippy(this.editBtnEleRef.nativeElement, {
      content: 'Test Tooltip!'
    })
  }

  onTodoClicked() {
    this.todoClicked.emit();
  }

  onEditClicked() {
    this.editClicked.emit();
  }

  onDeleteClicked() {
    this.deleteClicked.emit();
  }
}
