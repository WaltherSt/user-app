import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  title: string = 'Listado de usuarios';
  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe((users) => (this.users = users));
    }
  }

  onRemoveUser(id: number) {
    this.sharingData.idUserEventEmitter.emit(id);
  }
  onUpdateUser(user: User) {
    // this.sharingData.selectedUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id], { state: { user: user } });
  }
}
