import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  users: User[] = [];
  openCloseForm: boolean = false;

  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => {
      this.users = users;
    });
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find((user) => (user.id = id));
      this.sharingData.selectedUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
      } else {
        this.users = [...this.users, { ...user, id: this.users.length + 1 }];
      }
      this.router.navigate(['/users'], {
        state: { users: this.users },
      });

      Swal.fire({
        title: 'Guardado!',
        text: 'Usuario guardado con exito!',
        icon: 'success',
      });
      this.setOpenClose();
    });
  }

  removeUser() {
    this.sharingData.idUserEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Esta seguro de eliminar este registro?',
        text: 'La eliminación no se podra revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,estoy seguro',
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter((user) => user.id != id);
          this.router
            .navigate(['/users/create'], { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/users'], {
                state: { users: this.users },
              });
            });
          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario eliminado.',
            icon: 'success',
          });
        }
      });
    });
  }

  updateUser() {
    this.sharingData.selectedUserEventEmitter.subscribe((user) => {
      this.openCloseForm = true;
    });
  }

  setOpenClose() {
    this.openCloseForm = !this.openCloseForm;
  }
}
