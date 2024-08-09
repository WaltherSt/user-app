import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  @Input() user: User = new User();

  onSubmit(userform: NgForm): void {
    if (userform.valid) {
      this.newUserEventEmitter.emit(this.user);
    }
    userform.reset();
    userform.resetForm();
  }

  onClearForm() {
    this.user = new User();
  }
}
