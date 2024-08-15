import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  user = new User();

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService
  ) {
    this.user = new User();
  }
  ngOnInit(): void {
    this.sharingData.selectedUserEventEmitter.subscribe((user) => {
      this.user = user;
    });

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userform: NgForm): void {
    if (userform.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
    }
    userform.reset();
    userform.resetForm();
  }

  onClearForm() {
    this.user = new User();
  }
}
