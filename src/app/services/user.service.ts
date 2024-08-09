import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      userName: 'johndoe',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      userName: 'janesmith',
      password: 'securepass',
    },
    {
      id: 3,
      name: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      userName: 'michaelj',
      password: 'mypassword',
    },
    {
      id: 4,
      name: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      userName: 'emilyd',
      password: 'emilypass',
    },
    {
      id: 5,
      name: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      userName: 'davidb',
      password: 'davidsecure',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
