import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.css']
})
export class CompletedItemComponent {

  @Input() todo: Todo;
  @Output() sendToActive: EventEmitter<void> = new EventEmitter();
  @Output() editClick: EventEmitter<void> = new EventEmitter();
  @Output() deleteClick: EventEmitter<void> = new EventEmitter();

  onClicked() {
    this.sendToActive.emit();
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }
}
