import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listTechnicianComponent } from './components/list-technician/list-technician.component';
import { AuthGuard } from './components/shared/auth.guard';
import { RoleGuard } from './components/shared/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { addTechnicianComponent } from './components/add-technician/add-technician.component';
import { addProcessComponent } from './components/add-process/add-process.component';
import { addClientsComponent } from './components/add-clients/add-clients.component';
import { listClientComponent } from './components/list-client/list-client.component';
import { PagesLoginComponent } from './pages/login/pages-login.component';
import { addGreenHouseComponent } from './components/add-greenhouse/add-greenhouse.component';
import { listGreenHouse } from './components/list-greenhouse/list-greenhouse.component';

const routes: Routes = [
  { path: 'pages-login', component: PagesLoginComponent },
  { path: '', redirectTo:"/pages-login", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'addTechnician', component: addTechnicianComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'listTechnician', component: listTechnicianComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'listClient', component: listClientComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'addProcess', component: addProcessComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'addClients', component: addClientsComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'addGreenHouse', component: addGreenHouseComponent,canActivate: [AuthGuard] },
  { path: 'listGreenHouse', component: listGreenHouse,canActivate: [AuthGuard, RoleGuard] },
  { path: 'pages-blank', component: PagesBlankComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'pages-contact', component: PagesContactComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'pages-error404', component: PagesError404Component,canActivate: [AuthGuard, RoleGuard] },
  { path: 'pages-register', component: PagesRegisterComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'user-profile', component: UsersProfileComponent,canActivate: [AuthGuard, RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
