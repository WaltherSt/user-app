import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() userRemoveEmitter: EventEmitter<number> = new EventEmitter();
  @Output() userUpdateEmitter: EventEmitter<User> = new EventEmitter();

  onRemoveUser(id: number) {
    this.userRemoveEmitter.emit(id);
  }
  onUpdateUser(user: User) {
    this.userUpdateEmitter.emit(user);
  }
}
