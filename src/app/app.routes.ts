import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users',
  },
  {
    path: 'users',
    component: UsersTableComponent,
  },
  {
    path: 'users/create',
    component: UserFormComponent,
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
  },
];
