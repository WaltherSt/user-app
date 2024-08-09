import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UsersTableComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';
  users: User[] = [];
  userselected: User = new User();
  openCloseForm: boolean = false;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => {
      this.users = users;
    });
  }

  addUser(user: User) {
    let existUser = this.users.find((u) => u.id == user.id);
    if (existUser) {
      this.users = this.users.map((u) => (u.id == user.id ? { ...user } : u));
    } else {
      this.users = [...this.users, { ...user, id: this.users.length + 1 }];
    }

    this.userselected = new User();
    Swal.fire({
      title: 'Guardado!',
      text: 'Usuario guardado con exito!',
      icon: 'success',
    });
    this.setOpenClose();
  }
  removeUser(id: number) {
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
        Swal.fire({
          title: 'Eliminado!',
          text: 'Usuario eliminado.',
          icon: 'success',
        });
      }
    });
  }

  updateUser(user: User) {
    this.userselected = { ...user };
    this.openCloseForm = true;
  }

  setOpenClose() {
    this.openCloseForm = !this.openCloseForm;
  }
}
