import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { listTechnicianComponent } from './components/list-technician/list-technician.component';
import { addTechnicianComponent } from './components/add-technician/add-technician.component';
import { addProcessComponent } from './components/add-process/add-process.component';
import { addClientsComponent } from './components/add-clients/add-clients.component';
import { listClientComponent } from './components/list-client/list-client.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PagesLoginComponent } from './pages/login/pages-login.component';
import { addGreenHouseComponent } from './components/add-greenhouse/add-greenhouse.component';
import { listGreenHouse } from './components/list-greenhouse/list-greenhouse.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    addTechnicianComponent,
    listTechnicianComponent,
    addProcessComponent,
    addClientsComponent,
    listClientComponent,
    addGreenHouseComponent,
    listGreenHouse,
    UsersProfileComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    // RouterModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
