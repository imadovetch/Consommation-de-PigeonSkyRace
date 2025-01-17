import { Routes } from '@angular/router';
import { authGuard } from "./guards/Auth/auth.guard";
import { afterAuthGuard } from "./guards/Auth/after-auth.guard";
import { roleAdminGuard } from "./guards/role/role-admin.guard";
import {ORGANIZERComponent} from "./component/organizer/organizer.component";
import {roleOrganizerGuard} from "./guards/role/role-organizer.guard";
import {UserComponent} from "./component/user/user.component";
import {roleUserGuard} from "./guards/role/role-user.guard";
import {RegisterComponent} from "./component/register/register.component";
import {CompetitionComponent} from "./component/competition/competition.component";
import {PigeonToCompetitionComponent} from "./component/pigeon-to-competition/pigeon-to-competition.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./component/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./component/form/form.component').then(m => m.FormComponent),
    canActivate: [afterAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./component/register/register.component').then(m => m.RegisterComponent),
    canActivate: [afterAuthGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./component/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, roleAdminGuard]
  },
  {
    path: 'organizer/dashboard',
    loadComponent: () =>
      import('./component/organizer/organizer.component').then(m => m.ORGANIZERComponent),
    canActivate: [authGuard, roleOrganizerGuard]
  },
  {
    path: 'competition',
    loadComponent: () =>
      import('./component/competition/competition.component').then(m => m.CompetitionComponent),
    canActivate: [authGuard, roleOrganizerGuard]
  },
  {
    path: 'competition/:id',
    loadComponent: () =>
      import('./component/pigeon-to-competition/pigeon-to-competition.component').then(m => m.PigeonToCompetitionComponent),
    canActivate: [authGuard, roleOrganizerGuard]
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./component/user/user.component').then(m => m.UserComponent),
    canActivate: [authGuard, roleUserGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./component/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
