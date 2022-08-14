import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { AuthGuard } from './components/shared/auth.guard';
import { RoleGuard } from './components/shared/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

const routes: Routes = [
  { path: 'pages-login', component: PagesLoginComponent },
  { path: '', redirectTo:"/pages-login", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'alerts', component: AlertsComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'accordion', component: AccordionComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'form-editors', component: FormsEditorsComponent,canActivate: [AuthGuard, RoleGuard] },
  { path: 'form-elements', component: FormsElementsComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'form-layouts', component: FormsLayoutsComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent,canActivate: [AuthGuard] },
  { path: 'icons-remix', component: IconsRemixComponent,canActivate: [AuthGuard, RoleGuard] },
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
